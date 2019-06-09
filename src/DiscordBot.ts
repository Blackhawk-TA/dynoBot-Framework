import {IBot} from "./common/IBot";
import {IMessage} from "./wrappers/common/IMessage";
import {IServer} from "./wrappers/common/IServer";
import {DiscordServer} from "./wrappers/discord/DiscordServer";
import {IClient} from "./wrappers/common/IClient";
import {DiscordClient} from "./wrappers/discord/DiscordClient";

module.exports = class DiscordBot implements IBot {
	readonly _message: IMessage;
	readonly _server: IServer;
	readonly _client: IClient;

	constructor() {
		this._server = new DiscordServer();
		this._client = new DiscordClient();
	}

	public get server(): IServer {
		return this._server;
	}

	public get client(): IClient {
		return this._client;
	}
};