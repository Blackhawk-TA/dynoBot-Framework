import {IClient} from "../interfaces/IClient";
import {EventEmitter} from "events";
import {IUser} from "../interfaces/IUser";
import {DiscordUser} from "./DiscordUser";
import {IServer} from "../interfaces/IServer";
import {DiscordServer} from "./DiscordServer";
import {IEvent} from "../interfaces/IEvent";
import {DiscordEvent} from "./DiscordEvent";

export class DiscordClient implements IClient {
	private readonly _events: EventEmitter;
	private readonly _user: IUser;
	private readonly _client: any;

	constructor(client: any) {
		this._events = new EventEmitter();
		this._user = new DiscordUser(client.user);
		this._client = client;
	}

	getEvents(): EventEmitter {
		return this._events;
	}

	getUser(): IUser {
		return this._user;
	}

	getServers(): IServer[] {
		let servers: object[] = this._client.guilds.array();
		let wrappedServers: IServer[] = [];
		servers.forEach(server => {
			wrappedServers.push(new DiscordServer(server));
		});

		return wrappedServers;
	}

	registerEvent(name: string): void {
		let Event: IEvent = new DiscordEvent(name);
		let wrappedName: string = Event.getApiEventName();
		this._client.on(wrappedName, (object) => {
			let WrappedObject = Event.getWrappedObject(object);
			if (WrappedObject) {
				this._events.emit(name, WrappedObject);
			} else {
				this._events.emit(name);
			}
		});
	}
}