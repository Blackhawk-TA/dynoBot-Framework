import {IUser} from "../interfaces/IUser";
import {IChannel} from "../interfaces/IChannel";
import {IServer} from "../interfaces/IServer";
import {SlackApiHandler} from "./SlackApiHandler";

export class SlackUser implements IUser {
	private readonly _user: any;
	private readonly _ApiHandler: SlackApiHandler;

	constructor(user: any, ApiHandler: SlackApiHandler) {
		this._user = user;
		this._ApiHandler = ApiHandler;
	}

	createDM(): Promise<IChannel> {
		return undefined;
	}

	deleteDM(): Promise<IChannel> {
		return undefined;
	}

	getId(): number {
		return 0;
	}

	getName(): string {
		return "";
	}

	getServer(): IServer {
		return undefined;
	}

	getTag(): string {
		return "";
	}
}