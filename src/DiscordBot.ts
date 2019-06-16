import {IBot} from "./common/IBot";
import {IClient} from "./wrappers/common/IClient";
import {DiscordClient} from "./wrappers/discord/DiscordClient";

const Discord = require("discord.js");
const client = new Discord.Client();

export class DiscordBot implements IBot {
	_client: IClient;

	public constructor(token: string) {
		this._client = new DiscordClient(client);

		//Update client once it is logged in
		client.login(token).then(() => {
			this._client = new DiscordClient(client);
		});
	}

	public get client(): IClient {
		return this._client;
	}
}