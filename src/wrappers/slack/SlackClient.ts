import {IClient} from "../interfaces/IClient";
import {IUser} from "../interfaces/IUser";
import {EventEmitter} from "events";
import {IServer} from "../interfaces/IServer";
import {ErrorHandler} from "../../utils/ErrorHandler";

export class SlackClient implements IClient {
	private readonly _events: EventEmitter;
	private readonly _user: IUser; //TODO set
	private readonly _client: any;

	constructor(client: any) {
		this._events = new EventEmitter();
		this._client = client;
	}

	getUser(): IUser {
		return this._user;
	}

	getServers(): IServer[] {
		ErrorHandler.log("This method is not supported by the slack api.");
		return null;
	}
}
