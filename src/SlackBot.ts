import {IBot} from "./interfaces/IBot";
import {IClient} from "./wrappers/interfaces/IClient";
import {SlackApiHandler} from "./wrappers/slack/SlackApiHandler";
import {SlackClient} from "./wrappers/slack/SlackClient";
import {ErrorHandler} from "./utils/ErrorHandler";
import {PreInitClient} from "./utils/PreInitClient";

const WebSocket = require("ws");

export class SlackBot implements IBot {
	private _connection: WebSocket;
	private _client: IClient|PreInitClient;

	constructor(token: string) {
		let apiEvents = {
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
		this._client = new PreInitClient(apiEvents);

		SlackApiHandler.callMethod("rtm.connect", {token: token}).then(response => {
			if (response.ok) {
				this._connection = new WebSocket(response.url);
				this._client = new SlackClient(this._connection, apiEvents);
			} else {
				ErrorHandler.throwErrorMessage("Could not connect to the websocket: " + response.error);
			}
		}).catch(error => {
			ErrorHandler.throwError(error);
		});
	}

	getClient(): IClient {
		return this._client;
	}
}