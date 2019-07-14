import {IBot} from "./interfaces/IBot";
import {IClient} from "./wrappers/interfaces/IClient";
import {SlackApiHandler} from "./wrappers/slack/SlackApiHandler";
import {SlackClient} from "./wrappers/slack/SlackClient";
import {ErrorHandler} from "./utils/ErrorHandler";
import {EventWrapper} from "./utils/EventWrapper";
import {EventHandler} from "./utils/EventHandler";
import {EventEmitter} from "events";

const WebSocket = require("ws");

export class SlackBot implements IBot {
	private _connection: WebSocket;
	private _client: IClient;
	private readonly _token: string;
	private readonly _events: EventEmitter;
	private readonly _apiEvents = {
		error: {
			name: "onerror",
			returnClass: Error, //TODO check if it shall be wrapped
			isWrapped: false,
			isInitEvent: false
		},
		message: {
			name: "onmessage",
			returnClass: null, //TODO check how it shall be wrapped
			isWrapped: true,
			isInitEvent: false
		},
		ready: {
			name: "onopen",
			returnClass: SlackClient,
			isWrapped: true,
			isInitEvent: true
		}
	};

	constructor(token: string) {
		this._token = token;
	}

	onEvent(name: string, listener: (...args: any[]) => void): void {
		if (this._apiEvents.hasOwnProperty(name)) {
			let Event: EventHandler = new EventHandler(name, this._apiEvents);

			if (Event.isInitEvent()) {
				SlackApiHandler.callMethod("rtm.connect", {token: this._token}).then(response => {
					if (response.ok) {
						this._connection = new WebSocket(response.url);
						let eventWrapper: EventWrapper = new EventWrapper(this._connection, this._events);
						//TODO event registration for slack is different, move class from utils to wrappers
						eventWrapper.registerEvents(this._apiEvents, true);

						this._client = new SlackClient(this._connection);
						listener();
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