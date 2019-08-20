import {IMessage} from "../interfaces/IMessage";
import {IUser} from "../interfaces/IUser";
import {IServer} from "../interfaces/IServer";
import {IRole} from "../interfaces/IRole";
import {IChannel} from "../interfaces/IChannel";

export class SlackMessage implements IMessage {
	_message: any;

	constructor(message) {
		this._message = message;
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

	getChannel(): IChannel {
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
