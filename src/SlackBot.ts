import {IBot} from "./interfaces/IBot";
import {IClient} from "./wrappers/interfaces/IClient";

const WebSocket = require("ws");
const request = require("request");

export class SlackBot {
	_connection: WebSocket;

	constructor(token: string) {
		const data: object= {
			url: "https://slack.com/api/rtm.connect",
			form: {token: token}
		};
		request.post(data, (err, req, body) => {
			if (err) {
				console.error(err);
			}
			try {
				let response = JSON.parse(body);
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
					console.error("Invalid body");
				}
			} catch (error) {
				console.error(error);
			}
		});
	}
}