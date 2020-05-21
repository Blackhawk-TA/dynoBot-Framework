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
			authorId = this._message.user;

		returnValues.members.forEach(member => {
			if (member.id === authorId) {
				author = member;
			}
		});

		return new SlackUser(author, this._ApiHandler);
	}

	getAuthorRoles(): IRole[] {
		ErrorHandler.notSupported("Slack", "getAuthorRoles");
		return null;
	}

	getChannel(): IChannel {
		let returnValues = this._ApiHandler.getPreCalledMethod("channels.list"),
			channel = {};

		returnValues.channels.forEach(channelObject => {
			if (channelObject.id === this._message.channel) {
				channel = channelObject;
			}
		});

		return new SlackChannel(channel, this._ApiHandler);
	}

	getContent(excludeFirstWord?: boolean): string {
		let content: string = this._message.text;

		if (excludeFirstWord) {
			let authorEndIndex: number = content.indexOf(">") + 1;
			return content.substring(authorEndIndex).trimLeft();
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
		return RegexPattern.exec(this._message.text);
	}

	getServer(): IServer {
		let serverId = this._message.team,
			server = this._ApiHandler.getServer(serverId);

		return new SlackServer(server, this._ApiHandler);
	}

	hasServer(): boolean {
		return !!this._message.team;
	}

	isDeletable(): boolean {
		ErrorHandler.notSupported("Slack", "isDeletable");
		return null;
	}

	isMentioned(User: IUser): boolean {
		let content = this._message.text,
			pattern = new RegExp(/<@(\w+)>/gm),
			mentioned = false,
			mentions = content.match(pattern);

		if (mentions) {
			mentions.forEach(mention => {
				let result = pattern.exec(mention),
					id = result && result[1];

				if (id === User.getId()) {
					mentioned = true;
				}
			});
		}

		return mentioned;
	}
}
