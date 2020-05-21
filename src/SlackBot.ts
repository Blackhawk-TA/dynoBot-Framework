import {IBot} from "./interfaces/IBot";
import {IClient} from "./wrappers/interfaces/IClient";
import {SlackApiHandler} from "./wrappers/slack/utils/SlackApiHandler";
import {SlackClient} from "./wrappers/slack/SlackClient";
import {ErrorHandler} from "./utils/ErrorHandler";
import {EventEmitter} from "events";
import {SlackMessage} from "./wrappers/slack/SlackMessage";
import {SlackEventWrapper} from "./wrappers/slack/utils/SlackEventWrapper";
import {SlackEventHandler} from "./wrappers/slack/utils/SlackEventHandler";
import {SlackUser} from "./wrappers/slack/SlackUser";
import * as WebSocket from "ws";

export class SlackBot implements IBot {
	private _apiConnection: WebSocket;
	private _client: IClient;
	private readonly _events: EventEmitter;
	private readonly _ApiHandler: SlackApiHandler;
	private readonly _apiEvents = {
		error: {
			name: "onerror",
			returnClass: Error,
			isWrapped: false,
			isInitEvent: false
		},
		message: {
			name: "message",
			returnClass: SlackMessage,
			isWrapped: true,
			isInitEvent: false
		},
		serverMemberAdd: {
			name: "member_joined_channel", //TODO use returned userId to wrap the object, same for member_left_channel, or use user_change event
			returnClass: SlackUser, //TODO check if it works
			isWrapped: true,
			isInitEvent: false
		},
		serverMemberRemove: {
			name: "member_left_channel",
			returnClass: SlackUser, //TODO check if it works
			isWrapped: true,
			isInitEvent: false
		},
		ready: {
			name: "hello",
			returnClass: SlackClient,
			isWrapped: true,
			isInitEvent: true
		}
	};

	constructor(token: string) {
		this._events = new EventEmitter();
		this._ApiHandler = new SlackApiHandler(token);
	}

	onEvent(name: string, listener: (...args: any[]) => void): void {
		if (this._apiEvents.hasOwnProperty(name)) {
			let Event: SlackEventHandler = new SlackEventHandler(name, this._apiEvents, this._ApiHandler);

			if (Event.isInitEvent()) {
				this._ApiHandler.callMethod("rtm.connect").then(response => {
					if (response.ok) {
						this._apiConnection = new WebSocket(response.url);
						this._ApiHandler.setApiConnection(this._apiConnection);
						this._apiConnection.onopen = () => {
							let eventWrapper: SlackEventWrapper = new SlackEventWrapper(this._apiConnection, this._events, this._ApiHandler);
							eventWrapper.registerEvents(this._apiEvents, true);

							let botId = response.self.id;
							this._client = new SlackClient(this._apiConnection, botId, this._ApiHandler);
							listener();
						};
					} else {
						ErrorHandler.apiError("Slack", response.error);
					}
				}).catch(error => {
					ErrorHandler.throwError(error);
				});
			} else {
				this._events.on(name, listener);
			}
		} else {
			ErrorHandler.throwErrorMessage(`The event '${name}' is not supported.`);
		}
	}

	getClient(): IClient {
		if (this._client && this._ApiHandler) {
			return this._client;
		} else {
			ErrorHandler.throwErrorMessage("The bot has not been initialized yet.");
		}
	}
}