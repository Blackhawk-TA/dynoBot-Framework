import {IMessage} from "../interfaces/IMessage";
import {DiscordTextChannel} from "./DiscordTextChannel";
import {ITextChannel} from "../interfaces/ITextChannel";
import {IUser} from "../interfaces/IUser";
import {DiscordUser} from "./DiscordUser";
import {IRole} from "../interfaces/IRole";
import {DiscordRole} from "./DiscordRole";
import {IServer} from "../interfaces/IServer";
import {DiscordServer} from "./DiscordServer";
import {ErrorHandler} from "../../utils/ErrorHandler";

export class DiscordMessage implements IMessage {
	_message: any;

	constructor(message) {
		this._message = message;
	}

	getTextChannel(): ITextChannel {
		return new DiscordTextChannel(this._message.channel);
	}

	getContent(excludeFirstWord?: boolean): string {
		if (excludeFirstWord) {
			let content: string = this._message.content;
			let index: number = content.indexOf(" ");
			return content.slice(index + 1, content.length);
		} else {
			return this._message.content;
		}
	}

	getContentArray(excludeFirstWord?: boolean): string[] {
		let messageArray = this._message.content.split(" ");
		if (excludeFirstWord) {
			messageArray.shift();
			return messageArray;
		} else {
			return messageArray;
		}
	}

	getRegexGroups(RegexPattern: RegExp, excludeFirstWord?: boolean): string[] {
		return RegexPattern.exec(this.getContent(excludeFirstWord));
	}

	getAuthor(): IUser {
		let user: object = this._message.member || this._message.author;
		return new DiscordUser(user);
	}

	getAuthorRoles(): IRole[] {
		if (this._message.member && this._message.member.roles) {
			let roles = this._message.member.roles.cache.array(),
				Roles: IRole[] = [];

			roles.forEach(role => {
				Roles.push(new DiscordRole(role));
			});

			return Roles;
		} else {
			return [];
		}
	}

	hasServer(): boolean {
		return !!this._message.guild;
	}

	getServer(): IServer {
		if (this._message.guild) {
			return new DiscordServer(this._message.guild);
		} else {
			ErrorHandler.throwErrorMessage("The message was not sent on a server.");
		}
	}

	isMentioned(User: IUser): boolean {
		let mentionedUsers = this._message.mentions.users,
			mentioned = false;

		mentionedUsers.forEach(user => {
			if (User.getId() === user.id) {
				mentioned = true;
			}
		});

		return mentioned;
	}

	isDeletable(): boolean {
		return this._message.deletable;
	}

	delete(): Promise<IMessage | Error> {
		return new Promise<IMessage | Error>((resolve, reject) => {
			this._message.delete().then(message => {
				resolve(new DiscordMessage(message));
			}).catch(error => {
				reject(error);
			});
		});
	}

	getCreationDate(): Date {
		return this._message.createdAt;
	}
}
