import {IBot} from "./interfaces/IBot";
import {IClient} from "./wrappers/interfaces/IClient";

const WebSocket = require("ws");

export class SlackBot {
	_connection: WebSocket;

	constructor(token: string) {
		ApiHandler.callMethod("rtm.connect", {token: token}).then(response => {
			if (response.ok) {
				this._connection = new WebSocket(response.url);

				this._connection.onopen = () => {
				};
				this._connection.onclose = () => {
				};

				this._connection.onerror = error => {
					console.log(error)
				};

				this._connection.onmessage = event => {
					console.log(event);
				};
			} else {
				console.error("Invalid server response");
			}
		});
	}
}