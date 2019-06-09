import {IUser} from "../common/IUser";

export class DiscordUser implements IUser {
	private _User: any;
	constructor(Client: any) {
		this._User = Client.user;
	}

	getId(): number {
		return this._User.id; //TODO user handed over by Client has no id
	}
}