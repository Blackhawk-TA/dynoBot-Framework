import {IUser} from "../common/IUser";

export class DiscordUser implements IUser {
	private _user: any;
	constructor(client: any) {
		this._user = client.user;
	}

	getId(): number {
		return this._user.id;
	}

	getName(): string {
		return this._user.username;
	}
}