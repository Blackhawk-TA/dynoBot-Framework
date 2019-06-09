import {IUser} from "./IUser";

export interface IMessage {
	_message: any;
	isMentioned(User: IUser): boolean;
}