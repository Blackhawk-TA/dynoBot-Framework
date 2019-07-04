import {IClient} from "../interfaces/IClient";
import {IUser} from "../interfaces/IUser";
import {EventEmitter} from "events";
import {IServer} from "../interfaces/IServer";
import {ErrorHandler} from "../../utils/ErrorHandler";
import {SlackEvent} from "./SlackEvent";
import {IEvent} from "../interfaces/IEvent";

export class SlackClient implements IClient {
	private readonly _events: EventEmitter;
	private readonly _user: IUser; //TODO set
	private readonly _client: any;

	constructor(client: any) {
		this._events = new EventEmitter();
		this._client = client;
	}

	getEvents(): EventEmitter {
		return this._events;
	}

	getUser(): IUser {
		return this._user;
	}

	getServers(): IServer[] {
		ErrorHandler.log("This method is not supported by the slack api.");
		return null;
	}

	registerEvent(name: string) :void {
		let Event: IEvent = new SlackEvent(name);
		let wrappedName: string = Event.getWrappedName();
		this._client[wrappedName] = (object?: any) => {
			let WrappedObject = Event.getWrappedObject(object);
			if (WrappedObject) {
				this._events.emit(name, WrappedObject);
			} else {
				this._events.emit(name);
			}
		};
	}
}
