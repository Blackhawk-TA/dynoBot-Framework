import {IMessage} from "../common/IMessage";
import {DiscordChannel} from "./DiscordChannel";
import {IChannel} from "../common/IChannel";
import {IUser} from "../common/IUser";
import {DiscordUser} from "./DiscordUser";

export class DiscordMessage implements IMessage {
	_message: any;

	constructor(message) {
		this._message = message;
	}

	get channel(): IChannel {
		return new DiscordChannel(this._message.channel);
	}

	getContent(): string {
		return this._message.content;
	}

	getContentArray(): string[] {
		return this._message.content.split(" ");
	}

	getRegexGroups(RegexPattern: RegExp): string[] {
		return RegexPattern.exec(this._message.content);
	}

	getAuthor(): IUser {
		return new DiscordUser(this._message.author)
	}

	getChannel(): IChannel {
		return new DiscordChannel(this._message.channel);
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
}