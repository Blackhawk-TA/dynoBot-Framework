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
	private _connection: WebSocket;
	private _client: IClient;
	private readonly _token: string;
	private readonly _events: EventEmitter;
	private readonly _apiEvents = {
		//TODO instead of using the onmessage event, create a event for each onmessage subevent and trigger this
		error: {
			name: "onerror",
			returnClass: Error, //TODO check if it shall be wrapped
			isWrapped: false,
			isInitEvent: false
		},
		message: {
			name: "desktop_notification",
			returnClass: SlackMessage, //TODO check how it shall be wrapped
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
		this._token = token;
	}

	onEvent(name: string, listener: (...args: any[]) => void): void {
		if (this._apiEvents.hasOwnProperty(name)) {
			let Event: SlackEventHandler = new SlackEventHandler(name, this._apiEvents);

			if (Event.isInitEvent()) {
				SlackApiHandler.callMethod("rtm.connect", {token: this._token}).then(response => {
					if (response.ok) {
						this._connection = new WebSocket(response.url);
						this._connection.onopen = () => {
							let eventWrapper: SlackEventWrapper = new SlackEventWrapper(this._connection, this._events, SlackEventHandler);
							eventWrapper.registerEvents(this._apiEvents, true);

							this._client = new SlackClient(this._connection);
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