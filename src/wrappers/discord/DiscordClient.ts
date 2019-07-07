import {IClient} from "../interfaces/IClient";
import {EventEmitter} from "events";
import {IUser} from "../interfaces/IUser";
import {DiscordUser} from "./DiscordUser";
import {IServer} from "../interfaces/IServer";
import {DiscordServer} from "./DiscordServer";
import {DiscordMessage} from "./DiscordMessage";
import {EventHandler} from "../../utils/EventHandler";

export class DiscordClient implements IClient {
	private readonly _events: EventEmitter;
	private readonly _user: IUser;
	private readonly _client: any;
	private readonly _apiEvents = {
		error: {
			name: "error",
			returnClass: Error,
			isWrapped: false
		},
		serverMemberAdd: {
			name: "guildMemberAdd",
			returnClass: DiscordUser,
			isWrapped: true
		},
		serverMemberRemove: {
			name: "guildMemberRemove",
			returnClass: DiscordUser,
			isWrapped: true
		},
		message: {
			name: "message",
			returnClass: DiscordMessage,
			isWrapped: true
		},
		ready: {
			name: "ready",
			returnClass: null,
			isWrapped: false,
		}
	};

	constructor(client: any) {
		this._events = new EventEmitter();
		this._user = new DiscordUser(client.user);
		this._client = client;

		for (let name in this._apiEvents) { //register events
			let Event: EventHandler = new EventHandler(name, this._apiEvents);
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
}