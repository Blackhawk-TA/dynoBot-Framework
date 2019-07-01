import {IBot} from "./interfaces/IBot";
import {IClient} from "./wrappers/interfaces/IClient";
import {ApiHandler} from "./wrappers/slack/ApiHandler";
import {SlackClient} from "./wrappers/slack/SlackClient";
import {ErrorHandler} from "./utils/ErrorHandler";

const WebSocket = require("ws");

export class SlackBot implements IBot{
	_connection: WebSocket;

	constructor(token: string) {
		ApiHandler.callMethod("rtm.connect", {token: token}).then(response => {
			if (response.ok) {
				this._connection = new WebSocket(response.url);
			} else {
				ErrorHandler.log("Could not connect to the websocket: " + response.error);
			}
		});
	}

	getClient(): IClient {
		return new SlackClient(this._connection);
	}
}