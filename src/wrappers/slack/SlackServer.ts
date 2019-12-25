import {IServer} from "../interfaces/IServer";
import {IChannel} from "../interfaces/IChannel";
import {IUser} from "../interfaces/IUser";
import {IRole} from "../interfaces/IRole";
import {SlackApiHandler} from "./utils/SlackApiHandler";
import {ErrorHandler} from "../../utils/ErrorHandler";

export class SlackServer implements IServer {
	private readonly _server: any;
	private readonly _ApiHandler: SlackApiHandler;

	constructor(server: any, ApiHandler: SlackApiHandler) {
		this._server = server;
		this._ApiHandler = ApiHandler;
	}

	getChannels(): IChannel[] {
		ErrorHandler.notSupported("Slack", "getChannels");
		return null;
	}

	getId(): string {
		return this._server.id;
	}

	getMembers(): IUser[] {
		ErrorHandler.notSupported("Slack", "getMembers");
		return null;
	}

	getName(): string {
		return this._server.name;
	}

	getRoles(): IRole[] {
		ErrorHandler.notSupported("Slack", "getRoles");
		return null;
	}

	hasChannel(channelId: string): IChannel | boolean {
		ErrorHandler.notSupported("Slack", "hasChannel");
		return null;
	}
}