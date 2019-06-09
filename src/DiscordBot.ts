import {IBot} from "./common/IBot";
import {IServer} from "./wrappers/common/IServer";
import {DiscordServer} from "./wrappers/discord/DiscordServer";
import {IClient} from "./wrappers/common/IClient";
import {DiscordClient} from "./wrappers/discord/DiscordClient";

const Discord = require("discord.js");
const client = new Discord.Client();

module.exports = class DiscordBot implements IBot {
	private readonly _server: IServer;
	private readonly _client: IClient;

	constructor(token: string) {
		this._server = new DiscordServer();
		this._client = new DiscordClient(client);
		client.login(token);
	}

	public get server(): IServer {
		return this._server;
	}

	public get client(): IClient {
		return this._client;
	}
};