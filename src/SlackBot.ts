import {IBot} from "./interfaces/IBot";
import {IClient} from "./wrappers/interfaces/IClient";
import {SlackApiHandler} from "./wrappers/slack/SlackApiHandler";
import {SlackClient} from "./wrappers/slack/SlackClient";
import {ErrorHandler} from "./utils/ErrorHandler";
import {EventEmitter} from "events";
import {SlackMessage} from "./wrappers/slack/SlackMessage";
import {SlackEventWrapper} from "./wrappers/slack/SlackEventWrapper";
import {SlackEventHandler} from "./wrappers/slack/SlackEventHandler";

const WebSocket = require("ws");

export class SlackBot implements IBot {
	private _apiConnection: WebSocket;
	private _client: IClient;
	private readonly _events: EventEmitter;
	private readonly _ApiHandler: SlackApiHandler;
	private readonly _apiEvents = {
		error: {
			name: "onerror",
			returnClass: Error, //TODO check if it shall be wrapped
			isWrapped: false,
			isInitEvent: false
		},
		message: {
			name: "desktop_notification",
			returnClass: SlackMessage,
			isWrapped: true,
			isInitEvent: false
		},
		serverMemberAdd: {
			name: "member_joined_channel",
			returnClass: null,
			isWrapped: true,
			isInitEvent: false
		},
		serverMemberRemove: {
			name: "member_left_channel",
			returnClass: null,
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
						this._apiConnection.onopen = () => {
							let eventWrapper: SlackEventWrapper = new SlackEventWrapper(this._apiConnection, this._events, this._ApiHandler);
							eventWrapper.registerEvents(this._apiEvents, true);

							this._client = new SlackClient(this._apiConnection);
							listener();
						};
					} else {
						ErrorHandler.throwErrorMessage("Could not connect to the websocket: " + response.error);
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
		if (this._client) {
			return this._client;
		} else {
			ErrorHandler.throwErrorMessage("The bot has not been initialized yet.");
		}
	}
}