import {IMessage} from "../common/IMessage";
import {DiscordChannel} from "./DiscordChannel";
import {IChannel} from "../common/IChannel";
import {IUser} from "../common/IUser";

export class DiscordMessage implements IMessage {
	_message: any;

	constructor(message) {
		this._message = message;
	}

	get channel(): IChannel {
		return new DiscordChannel(this._message.channel);
	}

	isMentioned(User: IUser): boolean {
		let mentionedUsers = this._message.mentions.users;
		mentionedUsers.forEach(user => {
			if (User.getId() === user.id) {
				return true;
			}
		});
		return false;
	}
}