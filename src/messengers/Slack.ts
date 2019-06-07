import {IMessage} from "../wrappers/common/IMessage";
import {IServer} from "../wrappers/common/IServer";
import {IMessenger} from "./common/IMessenger";
import {MessageSlack} from "../wrappers/MessageSlack";
import {ServerSlack} from "../wrappers/ServerSlack";

module.exports = class Slack implements IMessenger {
	readonly _message: IMessage;
	readonly _server: IServer;

	constructor() {
		this._message = new MessageSlack();
		this._server = new ServerSlack();
	}

	public get message(): IMessage {
		return this._message;
	}

	public get server(): IServer {
		return this._server;
	}
};