import {IMessage} from "../interfaces/IMessage";
import {IUser} from "../interfaces/IUser";
import {IServer} from "../interfaces/IServer";
import {IRole} from "../interfaces/IRole";
import {IChannel} from "../interfaces/IChannel";
import {SlackApiHandler} from "./utils/SlackApiHandler";
import {SlackChannel} from "./SlackChannel";
import {ErrorHandler} from "../../utils/ErrorHandler";
import {SlackUser} from "./SlackUser";
import {SlackServer} from "./SlackServer";

export class SlackMessage implements IMessage {
	private readonly _ApiHandler: SlackApiHandler;
	private readonly _message: any;

	constructor(message, ApiHandler) {
		this._message = message;
		this._ApiHandler = ApiHandler;
	}

	delete(): Promise<IMessage|Error> { //TODO test if it works
		let params: object = {
			channel: this._message.channel,
			ts: this._message.ts
		};

		return new Promise<IMessage|Error>((resolve, reject) => {
			this._ApiHandler.callMethod("chat.delete", params).then(response => {
				if (response.ok) {
					resolve(new SlackMessage(response, this._ApiHandler));
				} else {
					reject(response);
				}
			}).catch(error => {
				reject(error);
			});
		});
	}

	getAuthor(): IUser {
		let returnValues = this._ApiHandler.getPreCalledMethod("users.list"),
			author = {},
			authorName = this._message.content.split(":")[0];

		returnValues.members.forEach(member => {
			if (member.id === authorName) {
				author = member;
			}
		});
		return new SlackUser(author, this._ApiHandler);
	}

	getAuthorRoles(): IRole[] {
		ErrorHandler.log("This method is not supported by the slack api.");
		return null;
	}

	getChannel(): IChannel {
		let returnValues = this._ApiHandler.getPreCalledMethod("channels.list"),
			channel = {};

		returnValues.channels.forEach(channelObject => {
			if (channelObject.id) {
				channel = channelObject;
			}
		});

		return new SlackChannel(channel, this._ApiHandler);
	}

	getContent(excludeFirstWord?: boolean): string {
		let fullContent: string = this._message.content,
			authorEndIndex: number = fullContent.indexOf(":") + 1,
			content: string = fullContent.substring(authorEndIndex).trimLeft();

		if (excludeFirstWord) {
			let firstWordEndIndex = content.indexOf(" ") + 1;
			return content.substring(firstWordEndIndex);
		} else {
			return content;
		}
	}

	getContentArray(excludeFirstWord?: boolean): string[] {
		let content = this.getContent(excludeFirstWord);
		return content.split(" ");
	}

	getCreationDate(): Date {
		return new Date(this._message.ts * 1000);
	}

	getRegexGroups(RegexPattern: RegExp): string[] {
		return RegexPattern.exec(this.getContent());
	}

	getServer(): IServer {
		let launchUriParts = this._message.launchUri.split("="),
			serverId = launchUriParts[launchUriParts.length - 1],
			server = this._ApiHandler.getServer(serverId);

		return new SlackServer(server, this._ApiHandler);
	}

	hasServer(): boolean {
		let launchUriParts = this._message.launchUri.split("="),
			serverId = launchUriParts[launchUriParts.length - 1];

		return !!this._message.title && serverId;
	}

	isDeletable(): boolean {
		ErrorHandler.log("This method is not supported by the slack api.");
		return null;
	}

	isMentioned(User: IUser): boolean {
		let content = this.getContent(false),
			mentioned = false;

		content.replace(/@\w+/g, function(name) {
			let nameWithoutPrefix = name.substring(1);
			if (User.getName() === nameWithoutPrefix) {
				mentioned = true;
			}
			return null;
		});
		return mentioned;
	}
}
