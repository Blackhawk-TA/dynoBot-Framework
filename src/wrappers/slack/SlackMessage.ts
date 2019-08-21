import {IMessage} from "../interfaces/IMessage";
import {IUser} from "../interfaces/IUser";
import {IServer} from "../interfaces/IServer";
import {IRole} from "../interfaces/IRole";
import {IChannel} from "../interfaces/IChannel";
import {SlackApiHandler} from "./SlackApiHandler";
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

	getChannel(): IChannel {
		let returnValues = this._ApiHandler.getPreCalledMethod("channels.list"),
			channel = {};

		returnValues.channels.forEach(channelObject => {
			if (channelObject.id) {
				channel = channelObject;
			}
		});

		return new SlackChannel(channel);
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
