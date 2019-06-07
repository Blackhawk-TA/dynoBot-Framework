import {IMessage} from "../wrappers/common/IMessage";
import {IServer} from "../wrappers/common/IServer";
import {IMessenger} from "./common/IMessenger";
import {MessageDiscord} from "../wrappers/MessageDiscord";
import {ServerDiscord} from "../wrappers/ServerDiscord";

module.exports = class Discord implements IMessenger {
	readonly _message: IMessage;
	readonly _server: IServer;

	constructor() {
		this._message = new MessageDiscord();
		this._server = new ServerDiscord();
	}

	public get message(): IMessage {
		return this._message;
	}

	public get server(): IServer {
		return this._server;
	}
};