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
	private readonly _apiEvents;

	constructor(client: any, apiEvents: object) {
		this._apiEvents = apiEvents;
		this._events = new EventEmitter();
		this._client = client;

		for (let name in this._apiEvents) { //register events
			if (this._apiEvents.hasOwnProperty(name)) {
				let Event: EventHandler = new EventHandler(name, this._apiEvents);
				let apiEventName: string = Event.getApiEventName();
				this._client.on(apiEventName, (object) => {
					let WrappedObject = Event.getWrappedObject(object);
					if (WrappedObject) {
						this._events.emit(name, WrappedObject);
					} else {
						this._events.emit(name);
					}
				});
			}
		}
	}

	onEvent(name: string, listener: (...args: any[]) => void): void {
		if (this._apiEvents.hasOwnProperty(name)) {
			this._events.on(name, listener);
		} else {
			ErrorHandler.throwErrorMessage(`The event '${name}' is not supported.`);
		}
	}

	getUser(): IUser {
		return this._user;
	}

	getServers(): IServer[] {
		ErrorHandler.log("This method is not supported by the slack api.");
		return null;
	}
}
