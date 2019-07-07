import {IClient} from "../interfaces/IClient";
import {IUser} from "../interfaces/IUser";
import {EventEmitter} from "events";
import {IServer} from "../interfaces/IServer";
import {ErrorHandler} from "../../utils/ErrorHandler";
import {EventHandler} from "../../utils/EventHandler";

export class SlackClient implements IClient {
	private readonly _events: EventEmitter;
	private readonly _user: IUser; //TODO set
	private readonly _client: any;
	private readonly _apiEvents = {
		error: {
			name: "onerror",
			returnClass: Error, //TODO check if it shall be wrapped
			isWrapped: false
		},
		message: {
			name: "onmessage",
			returnClass: null, //TODO check how it shall be wrapped
			isWrapped: true
		},
		ready: {
			name: "onopen",
			returnClass: SlackClient,
			isWrapped: true,
		}
	};

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
		let Event: EventHandler = new EventHandler(name, this._apiEvents);
		let wrappedName: string = Event.getApiEventName();
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
