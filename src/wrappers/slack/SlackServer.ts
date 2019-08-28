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
		ErrorHandler.log("This method is not supported by the slack api.");
		return null;
	}

	getId(): string {
		return this._server.id;
	}

	getMembers(): IUser[] {
		ErrorHandler.log("This method is not supported by the slack api.");
		return null;
	}

	getName(): string {
		return this._server.name;
	}

	getRoles(): IRole[] {
		ErrorHandler.log("This method is not supported by the slack api.");
		return null;
	}

	hasChannel(channelId: string): IChannel | boolean {
		ErrorHandler.log("This method is not supported by the slack api.");
		return null;
	}
}