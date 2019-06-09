import {IClient} from "../common/IClient";
import {DiscordEvents} from "./DiscordEvents";
import {EventEmitter} from "events";
import {IUser} from "../common/IUser";
import {DiscordUser} from "./DiscordUser";

const Discord = require("discord.js");
const Client = new Discord.Client();

export class DiscordClient implements IClient {
	readonly _events: EventEmitter;
	readonly _user: IUser;

	constructor() {
		this._events = new EventEmitter();
		this._user = new DiscordUser(Client);
	}

	get events(): EventEmitter {
		return this._events;
	}

	get user(): IUser {
		return this._user;
	}

	registerEvent(name: string): void {
		Client.on(name, (object) => {
			let Events = new DiscordEvents(object);
			let WrappedObject = Events.getEvent(name);
			let EventParameter = WrappedObject ? WrappedObject : new Error(`Unknown event '${name}'`); //TODO error catch doesnt work

			this._events.emit(name, EventParameter);
		});
	}

	/**
	 * Init the bot
	 * @param token
	 */
	login(token: string): void {
		Client.login(token);
	}
}