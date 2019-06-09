import {IChannel} from "../common/IChannel";

export class DiscordChannel implements IChannel {
	private _channel: any;

	constructor(channel: object) {
		this._channel = channel;
	}

	send(msg: string): void {
		this._channel.send(msg);
	}
}