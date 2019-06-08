import {IClient} from "../common/IClient";

const Discord = require("discord.js");
const Client = new Discord.Client();

export class ClientDiscord implements IClient {
	on(eventName: string): any {
		return new Promise(resolve =>
			Client.on(eventName, (msg) => {
				resolve(msg); //TODO wrap msg object
			})
		);
	}

	/**
	 * Init the bot
	 * @param token
	 */
	login(token: string): void {
		Client.login(token);
	}
}