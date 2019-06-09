import {IClient} from "../common/IClient";
import {DiscordEvent} from "./DiscordEvent";
import {EventEmitter} from "events";
import {IUser} from "../common/IUser";
import {DiscordUser} from "./DiscordUser";

export class DiscordClient implements IClient {
	private readonly _events: EventEmitter;
	private readonly _user: IUser;
	private _client: any;
	constructor(client: any) {
		this._events = new EventEmitter();
		this._user = new DiscordUser(client);
		this._client = client;
	}

	get events(): EventEmitter {
		return this._events;
	}

	get user(): IUser {
		return this._user;
	}

	registerEvent(name: string): void {
		let Event = new DiscordEvent(name);
		this._client.on(name, (object) => {
			let WrappedObject = Event.getWrappedObject(object);
			this._events.emit(name, WrappedObject);
		});
	}
}