import {IVoiceChannel} from "../interfaces/IVoiceChannel";
import {IUser} from "../interfaces/IUser";
import {IServer} from "../interfaces/IServer";
import {DiscordServer} from "./DiscordServer";
import {DiscordUser} from "./DiscordUser";
import {DiscordVoiceConnection} from "./DiscordVoiceConnection";
import {IVoiceConnection} from "../interfaces/IVoiceConnection";
import {ErrorHandler} from "../../utils/ErrorHandler";

export class DiscordVoiceChannel implements IVoiceChannel {
	private _channel: any;
	private _connection: IVoiceConnection;

	constructor(channel: object) {
		this._channel = channel;
	}

	getId(): number {
		return this._channel.id;
	}

	getMembers(): IUser[] {
		let members = this._channel.members.cache.array(),
			Members: IUser[] = [];

		members.forEach(member => {
			Members.push(new DiscordUser(member));
		});

		return Members;
	}

	getName(): boolean {
		return this._channel.name;
	}

	getServer(): IServer {
		return new DiscordServer(this._channel.guild);
	}

	getUserLimit(): number {
		return this._channel.userLimit;
	}

	getConnection(): IVoiceConnection {
		if (this._connection) {
			return this._connection;
		} else {
			ErrorHandler.log("There is no active voice connection. The bot has to join a channel first.");
			return null;
		}
	}

	isDeletable(): boolean {
		return this._channel.deletable;
	}

	wasDeleted(): boolean {
		return this._channel.deleted;
	}

	isFull(): boolean {
		return this._channel.full;
	}

	canJoin(): boolean {
		return this._channel.joinable;
	}

	join(): Promise<DiscordVoiceConnection> {
		return new Promise<any>(((resolve, reject) => {
			this._channel.join().then(connection => {
				this._connection = new DiscordVoiceConnection(connection);
				resolve(this._connection);
			}).catch(error => {
				reject(error);
			});
		}));
	}

	leave(): void {
		this._channel.leave();
	}
}
