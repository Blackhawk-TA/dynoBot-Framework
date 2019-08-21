import {IMessage} from "../interfaces/IMessage";
import {IUser} from "../interfaces/IUser";
import {IServer} from "../interfaces/IServer";
import {IRole} from "../interfaces/IRole";
import {IChannel} from "../interfaces/IChannel";
import {SlackApiHandler} from "./SlackApiHandler";
import {ErrorHandler} from "../../utils/ErrorHandler";
import {SlackChannel} from "./SlackChannel";

export class SlackMessage implements IMessage {
	private readonly _ApiHandler: SlackApiHandler;
	_message: any;

	constructor(message, ApiHandler) {
		this._message = message;
		this._ApiHandler = ApiHandler;
	}

	delete(): Promise<IMessage | Error> {
		return undefined;
	}

	getAuthor(): IUser {
		return undefined;
	}

	getAuthorRoles(): IRole[] {
		return [];
	}

	getChannel(): IChannel { //TODO should be callable without promise
		this._ApiHandler.callMethod("channels.info", {channel: this._message.channel}).then(response => {
			console.log(response);
			return new SlackChannel(response);
		}).catch(error => {
			ErrorHandler.throwErrorMessage("Following problem occurred while on the method call: " + error);
			return undefined;
		});
		return undefined;
	}

	getContent(excludeFirstWord?: boolean): string {
		return "";
	}

	getContentArray(excludeFirstWord?: boolean): string[] {
		return [];
	}

	getCreationDate(): Date {
		return undefined;
	}

	getRegexGroups(regexPattern: RegExp): string[] {
		return [];
	}

	getServer(): IServer {
		return undefined;
	}

	hasServer(): boolean {
		return false;
	}

	isDeletable(): boolean {
		return false;
	}

	isMentioned(User: IUser): boolean {
		return false;
	}
}
