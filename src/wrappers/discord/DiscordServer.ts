import {IServer} from "../common/IServer";
import {IUser} from "../common/IUser";
import {DiscordUser} from "./DiscordUser";
import {IChannel} from "../common/IChannel";
import {DiscordChannel} from "./DiscordChannel";
import {IRole} from "../common/IRole";
import {DiscordRole} from "./DiscordRole";

export class DiscordServer implements IServer {
	private _server: any;

	constructor(server) {
		this._server = server;
	}

	getId(): number {
		return this._server.id;
	}

	getName(): string {
		return this._server.name
	}

	getMembers(): IUser[] {
		let members = this._server.members.array(),
			Members: IUser[] = [];

		members.forEach(member => {
			Members.push(new DiscordUser(member.user));
		});

		return Members;
	}

	getChannels(): IChannel[] {
		let channels = this._server.channels.array(),
			Channels: IChannel[] = [];

		channels.forEach(channel => {
			Channels.push(new DiscordChannel(channel));
		});

		return Channels;
	}

	getRoles(): IRole[] {
		let roles = this._server.roles.array(),
			Roles: IRole[] = [];

		roles.forEach(role => {
			Roles.push(new DiscordRole(role));
		});

		return Roles;
	}
}