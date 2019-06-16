import {IMessage} from "../common/IMessage";
import {DiscordChannel} from "./DiscordChannel";
import {IChannel} from "../common/IChannel";
import {IUser} from "../common/IUser";
import {DiscordUser} from "./DiscordUser";
import {IRole} from "../common/IRole";
import {DiscordRole} from "./DiscordRole";
import {IServer} from "../common/IServer";
import {DiscordServer} from "./DiscordServer";

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
		return new DiscordUser(this._message.author);
	}

	getAuthorRoles(): IRole[] {
		let roles = this._message.member.roles.array(),
			Roles: IRole[] = [];

		roles.forEach(role => {
			Roles.push(new DiscordRole(role));
		});

		return Roles;
	}

	getChannel(): IChannel {
		return new DiscordChannel(this._message.channel);
	}

	getServer(): IServer {
		return new DiscordServer(this._message.guild);
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
		})
	}

	getCreationDate(): Date {
		return this._message.createdAt;
	}
}