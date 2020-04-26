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
		let members = this._server.members.array(),
			Members: IUser[] = [];

		members.forEach(member => {
			Members.push(new DiscordUser(member.user));
		});

		return Members;
	}

	getTextChannels(): ITextChannel[] {
		let channels = this._server.channels.array(),
			Channels: ITextChannel[] = [];

		channels.forEach(channel => {
			Channels.push(new DiscordTextChannel(channel));
		});

		return Channels;
	}

	getTextChannel(channelId: string): ITextChannel {
		let i: number = 0,
			channels = this._server.channels.array();

		while(i < channels.length) {
			if (channels[i].id === channelId && channels[i].type === "text") {
				return new DiscordTextChannel(channels[i]);
			}
			i++;
		}
	}

	hasTextChannel(channelId: string): boolean {
		let i: number = 0,
			channels = this._server.channels.array();

		while(i < channels.length) {
			if (channels[i].id === channelId && channels[i].type === "text") {
				return true;
			}
			i++;
		}

		return false;
	}

	getVoiceChannels(): IVoiceChannel[] {
		let channels = this._server.channels.array(),
			Channels: IVoiceChannel[] = [];

		channels.forEach(channel => {
			Channels.push(new DiscordVoiceChannel(channel));
		});

		return Channels;
	}

	getVoiceChannel(channelId: string): IVoiceChannel {
		let i: number = 0,
			channels = this._server.channels.array();

		while(i < channels.length) {
			if (channels[i].id === channelId && channels[i].type === "voice") {
				return new DiscordVoiceChannel(channels[i]);
			}
			i++;
		}
	}

	hasVoiceChannel(channelId: string): boolean {
		let i: number = 0,
			channels = this._server.channels.array();

		while(i < channels.length) {
			if (channels[i].id === channelId && channels[i].type === "voice") {
				return true;
			}
			i++;
		}

		return false;
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
