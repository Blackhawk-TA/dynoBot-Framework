import {IBot} from "./interfaces/IBot";
import {IClient} from "./wrappers/interfaces/IClient";
import {DiscordClient} from "./wrappers/discord/DiscordClient";
import {ErrorHandler} from "./utils/ErrorHandler";
import {DiscordUser} from "./wrappers/discord/DiscordUser";
import {DiscordMessage} from "./wrappers/discord/DiscordMessage";

const Discord = require("discord.js");
const client = new Discord.Client();

export class DiscordBot implements IBot {
	private _client: IClient;

	public constructor(token: string) {
		let apiEvents = {
			error: {
				name: "error",
				returnClass: Error,
				isWrapped: false,
				isInitEvent: false
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
		this._client = new DiscordClient(client, apiEvents); //TODO use clientInitHelper

		//Update client once it is logged in
		client.login(token).then(() => {
			this._client = new DiscordClient(client, apiEvents);
		}).catch(error => {
			ErrorHandler.throwError(error);
		});
	}

	public getClient(): IClient {
		return this._client;
	}
}