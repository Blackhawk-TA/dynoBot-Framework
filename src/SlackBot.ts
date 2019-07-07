import {IBot} from "./interfaces/IBot";
import {IClient} from "./wrappers/interfaces/IClient";
import {ApiHandler} from "./wrappers/slack/ApiHandler";
import {SlackClient} from "./wrappers/slack/SlackClient";
import {ErrorHandler} from "./utils/ErrorHandler";

const WebSocket = require("ws");

export class SlackBot implements IBot{
	private _connection: WebSocket;
	private _client: IClient;

	constructor(token: string) {
		ApiHandler.callMethod("rtm.connect", {token: token}).then(response => {
			if (response.ok) {
				this._connection = new WebSocket(response.url);
				this._client = new SlackClient(this._connection);
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