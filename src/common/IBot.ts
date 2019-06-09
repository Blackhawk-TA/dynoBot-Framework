import {IMessage} from "../wrappers/common/IMessage";
import {IServer} from "../wrappers/common/IServer";
import {IClient} from "../wrappers/common/IClient";

export interface IBot {
	readonly _message: IMessage;
	readonly _server: IServer;
	readonly _client: IClient;
}