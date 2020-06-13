import {IClient} from "../interfaces/IClient";
import {IUser} from "../interfaces/IUser";
import {DiscordUser} from "./DiscordUser";
import {IServer} from "../interfaces/IServer";
import {DiscordServer} from "./DiscordServer";
import {ErrorHandler} from "../../utils/ErrorHandler";

export class DiscordClient implements IClient {
	private readonly _user: IUser;
	private readonly _client: any;

	constructor(client: any) {
		this._user = new DiscordUser(client);
		this._client = client;
	}

	getUser(): IUser {
		return this._user;
	}

	getServers(): IServer[] {
		let servers: object[] = this._client.guilds.cache.array();
		let wrappedServers: IServer[] = [];
		servers.forEach(server => {
			wrappedServers.push(new DiscordServer(server));
		});

		return wrappedServers;
	}

	setPresence(text: string): void {
		this._client.user.setPresence({
			activity: {name: text},
			status: "online"
		}).catch(err => {
			ErrorHandler.log(`Unable to set presence: ${err}`);
		});
	}
}
