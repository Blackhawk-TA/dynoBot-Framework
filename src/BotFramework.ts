import {IMessenger} from "./messengers/common/IMessenger";
import {IMessage} from "./wrappers/common/IMessage";
import {IServer} from "./wrappers/common/IServer";

module.exports = class BotFramework {

	private _wrapper: IMessenger;
	private readonly _message: IMessage;
	private readonly _server: IServer;

	constructor(wrapper: IMessenger) {
		this._wrapper = wrapper;
		this._message = wrapper._message;
		this._server = wrapper._server;
	}

	public get message(): IMessage {
		return this._message;
	}

	public get server(): IServer {
		return this._server;
	}
};