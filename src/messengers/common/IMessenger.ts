import {IMessage} from "../../wrappers/common/IMessage";
import {IServer} from "../../wrappers/common/IServer";

export interface IMessenger {
	readonly _message: IMessage;
	readonly _server: IServer;
}