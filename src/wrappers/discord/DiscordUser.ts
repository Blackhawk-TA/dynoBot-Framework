import {IUser} from "../interfaces/IUser";
import {DiscordTextChannel} from "./DiscordTextChannel";
import {IServer} from "../interfaces/IServer";
import {DiscordServer} from "./DiscordServer";
import {ErrorHandler} from "../../utils/ErrorHandler";

export class DiscordUser implements IUser {
	private _user: any;
	constructor(user: any) {
		this._user = user;
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
			return new DiscordServer(this._user.guild);
		} else {
			ErrorHandler.log("The user is currently not acting on a server.");
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
