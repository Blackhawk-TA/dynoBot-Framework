import {IClient} from "../common/IClient";
import {DiscordEvents} from "./DiscordEvents";

const Discord = require("discord.js");
const Client = new Discord.Client();

export class DiscordClient implements IClient {

	/**
	 * Registers an event
	 *
	 * @param {string} name - The name of the event
	 */
	on(name: string): any {
		return new Promise((resolve, reject) =>
			Client.on(name, (object) => {
				let Events = new DiscordEvents(object);
				let WrappedObject = Events.getEvent(name);
				if (WrappedObject) {
					resolve(WrappedObject);
				} else {
					reject();
				}
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