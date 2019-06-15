import {IChannel} from "../common/IChannel";
import {IServer} from "../common/IServer";
import {DiscordServer} from "./DiscordServer";

export class DiscordChannel implements IChannel {
	private _channel: any;

	constructor(channel: object) {
		this._channel = channel;
	}

	send(msg: string): void {
		this._channel.send(msg);
	}

	getId(): number {
		return this._channel.id;
	}

	getName(): string {
		return this._channel.name;
	}

	getServer(): IServer {
		return new DiscordServer(this._channel.guild);
	}
}