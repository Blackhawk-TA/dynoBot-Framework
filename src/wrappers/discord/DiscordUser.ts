import {IUser} from "../interfaces/IUser";
import {DiscordChannel} from "./DiscordChannel";

export class DiscordUser implements IUser {
	private _user: any;
	constructor(user: any) {
		this._user = user;
	}

	getId(): number {
		return this._user.user.id;
	}

	getName(): string {
		return this._user.user.username;
	}

	createDM(): Promise<DiscordChannel> {
		return new Promise<DiscordChannel>((resolve, reject) => {
			this._user.createDM().then(channel => {
				resolve(new DiscordChannel(channel));
			}).catch(reason => {
				reject(reason);
			});
		});
	}

	deleteDM(): Promise<DiscordChannel> {
		return new Promise<DiscordChannel>((resolve, reject) => {
			this._user.deleteDM().then(channel => {
				resolve(new DiscordChannel(channel));
			}).catch(reason => {
				reject(reason);
			});
		});
	}
}