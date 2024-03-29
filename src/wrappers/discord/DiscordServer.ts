import {IServer} from "../interfaces/IServer";
import {IUser} from "../interfaces/IUser";
import {DiscordUser} from "./DiscordUser";
import {ITextChannel} from "../interfaces/ITextChannel";
import {DiscordTextChannel} from "./DiscordTextChannel";
import {IRole} from "../interfaces/IRole";
import {DiscordRole} from "./DiscordRole";
import {DiscordVoiceChannel} from "./DiscordVoiceChannel";
import {IVoiceChannel} from "../interfaces/IVoiceChannel";

export class DiscordServer implements IServer {
	private _server: any;

	constructor(server) {
		this._server = server;
	}

	getId(): number {
		return this._server.id;
	}

	getName(): string {
		return this._server.name;
	}

	getMembers(): IUser[] {
		return this.getOnlineMembers();
	}

	getOnlineMembers(): IUser[] {
		let members = this._server.members.cache.array(),
			Members: IUser[] = [];

		members.forEach(member => {
			Members.push(new DiscordUser(member));
		});

		return Members;
	}

	getMemberById(id: string): Promise<IUser> {
		return new Promise<IUser>((resolve, reject) => {
			this._server.members.fetch(id).then(member => {
				resolve(new DiscordUser((member)));
			}).catch(error => {
				reject(error);
			});
		});
	}

	getTextChannels(): ITextChannel[] {
		let channels = this._server.channels.cache.array(),
			Channels: ITextChannel[] = [];

		channels.forEach(channel => {
			Channels.push(new DiscordTextChannel(channel));
		});

		return Channels;
	}

	getTextChannel(channelId: string): ITextChannel {
		let i: number = 0,
			channels = this._server.channels.cache.array();

		while(i < channels.length) {
			if (channels[i].id === channelId && channels[i].type === "text") {
				return new DiscordTextChannel(channels[i]);
			}
			i++;
		}
	}

	hasTextChannel(channelId: string): boolean {
		let i: number = 0,
			channels = this._server.channels.cache.array();

		while(i < channels.length) {
			if (channels[i].id === channelId && channels[i].type === "text") {
				return true;
			}
			i++;
		}

		return false;
	}

	getVoiceChannels(): IVoiceChannel[] {
		let channels = this._server.channels.cache.array(),
			Channels: IVoiceChannel[] = [];

		channels.forEach(channel => {
			Channels.push(new DiscordVoiceChannel(channel));
		});

		return Channels;
	}

	getVoiceChannel(channelId: string): IVoiceChannel {
		let i: number = 0,
			channels = this._server.channels.cache.array();

		while(i < channels.length) {
			if (channels[i].id === channelId && channels[i].type === "voice") {
				return new DiscordVoiceChannel(channels[i]);
			}
			i++;
		}
	}

	hasVoiceChannel(channelId: string): boolean {
		let i: number = 0,
			channels = this._server.channels.cache.array();

		while(i < channels.length) {
			if (channels[i].id === channelId && channels[i].type === "voice") {
				return true;
			}
			i++;
		}

		return false;
	}

	getRoles(): IRole[] {
		let roles = this._server.roles.cache.array(),
			Roles: IRole[] = [];

		roles.forEach(role => {
			Roles.push(new DiscordRole(role));
		});

		return Roles;
	}
}
