import {IBot} from "./common/IBot";
import {IMessage} from "./wrappers/common/IMessage";
import {MessageDiscord} from "./wrappers/discord/MessageDiscord";
import {IServer} from "./wrappers/common/IServer";
import {ServerDiscord} from "./wrappers/discord/ServerDiscord";
import {IClient} from "./wrappers/common/IClient";
import {ClientDiscord} from "./wrappers/discord/ClientDiscord";

module.exports = class DiscordBot implements IBot {
	readonly _message: IMessage;
	readonly _server: IServer;
	readonly _client: IClient;

	constructor() {
		this._message = new MessageDiscord();
		this._server = new ServerDiscord();
		this._client = new ClientDiscord();
	}

	public get message(): IMessage {
		return this._message;
	}

	public get server(): IServer {
		return this._server;
	}

	public get client(): IClient {
		return this._client;
	}
};