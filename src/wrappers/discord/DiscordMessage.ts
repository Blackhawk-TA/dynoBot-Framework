import {IMessage} from "../common/IMessage";
import {DiscordChannel} from "./DiscordChannel";
import {IChannel} from "../common/IChannel";

export class DiscordMessage implements IMessage {
	_message: any;

	constructor(message) {
		this._message = message;
	}

	get channel(): IChannel {
		return new DiscordChannel(this._message.channel);
	}
}