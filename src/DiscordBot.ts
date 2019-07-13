import {IBot} from "./interfaces/IBot";
import {IClient} from "./wrappers/interfaces/IClient";
import {DiscordClient} from "./wrappers/discord/DiscordClient";
import {ErrorHandler} from "./utils/ErrorHandler";
import {DiscordUser} from "./wrappers/discord/DiscordUser";
import {DiscordMessage} from "./wrappers/discord/DiscordMessage";
import {EventEmitter} from "events";
import {EventHandler} from "./utils/EventHandler";

const Discord = require("discord.js");
const client = new Discord.Client();

export class DiscordBot implements IBot {
	private _client: IClient;
	private readonly _events: EventEmitter;
	private readonly _apiEvents = {
		error: {
			name: "error",
			returnClass: Error,
			isWrapped: false,
			isInitEvent: true
		},
		serverMemberAdd: {
			name: "guildMemberAdd",
			returnClass: DiscordUser,
			isWrapped: true,
			isInitEvent: false
		},
		serverMemberRemove: {
			name: "guildMemberRemove",
			returnClass: DiscordUser,
			isWrapped: true,
			isInitEvent: false
		},
		message: {
			name: "message",
			returnClass: DiscordMessage,
			isWrapped: true,
			isInitEvent: false
		},
		ready: {
			name: "ready",
			returnClass: null,
			isWrapped: false,
			isInitEvent: true
		}
	};

	constructor(token: string) {
		this._events = new EventEmitter();

		for (let name in this._apiEvents) {
			let Event: EventHandler = new EventHandler(name, this._apiEvents);
			if (Event.isInitEvent()) {
				Event.wrap(client, this._events);
			}
		}

		client.login(token).then(() => {
			for (let name in this._apiEvents) { //register events
				let Event: EventHandler = new EventHandler(name, this._apiEvents);
				if (!Event.isInitEvent()) {
					Event.wrap(client, this._events);
				}
			}

			this._client = new DiscordClient(client);
		}).catch(error => {
			ErrorHandler.throwError(error);
		});
	}

	onEvent(name: string, listener: (...args: any[]) => void): void {
		if (this._apiEvents.hasOwnProperty(name)) {
			this._events.on(name, listener);
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