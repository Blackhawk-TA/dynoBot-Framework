import {IUser} from "../interfaces/IUser";
import {DiscordTextChannel} from "./DiscordTextChannel";
import {IServer} from "../interfaces/IServer";
import {DiscordServer} from "./DiscordServer";
import {ErrorHandler} from "../../utils/ErrorHandler";
import {IVoiceChannel} from "../interfaces/IVoiceChannel";

export class DiscordUser implements IUser {
	private _member: any;
	private _user: any;

	constructor(member: any) {
		this._user = member.user || member;
		this._member = member;
	}

	getId(): number {
		return this._user.id;
	}

	getName(): string {
		return this._user.username;
	}

	getTag(): string {
		return this._user.tag;
	}

	getServer(): IServer {
		if (this._user.guild) {
			return new DiscordServer(this._member.user.guild);
		} else if (this._member.guild) {
			return new DiscordServer(this._member.guild);
		} else {
			ErrorHandler.log("The user is currently not acting on a server.");
			return null;
		}
	}

	getVoiceChannel(): IVoiceChannel {
		if (this._member.voice && this._member.voice.channelID) {
			let i: number = 0,
				voiceChannels: IVoiceChannel[] = this.getServer().getVoiceChannels();

			while (i < voiceChannels.length) {
				if (voiceChannels[i].getId() === this._member.voice.channelID) {
					return voiceChannels[i];
				}
				i++;
			}
		} else {
			ErrorHandler.log("The user is currently not active on a voice channel.");
			return null;
		}
	}

	createDM(): Promise<DiscordTextChannel> {
		return new Promise<DiscordTextChannel>((resolve, reject) => {
			this._user.createDM().then(channel => {
				resolve(new DiscordTextChannel(channel));
			}).catch(reason => {
				reject(reason);
			});
		});
	}

	deleteDM(): Promise<DiscordTextChannel> {
		return new Promise<DiscordTextChannel>((resolve, reject) => {
			this._user.deleteDM().then(channel => {
				resolve(new DiscordTextChannel(channel));
			}).catch(reason => {
				reject(reason);
			});
		});
	}
}
