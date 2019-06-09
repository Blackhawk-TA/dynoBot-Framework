import {EventEmitter} from "events";
import {IUser} from "./IUser";

export interface IClient {
	_events: EventEmitter;
	_user: IUser;
	registerEvent(name: string): void
	login(token: string): void;
}