import {IUser} from "../common/IUser";

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

	createDM(): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			this._user.createDM().then(result => {
				resolve(result) //TODO wrap
			}).catch(reason => {
				reject(reason);
			});
		});
	}
}