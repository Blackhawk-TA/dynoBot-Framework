import {IVoiceConnection} from "../interfaces/IVoiceConnection";
import {IVoiceChannel} from "../interfaces/IVoiceChannel";
import {DiscordVoiceChannel} from "./DiscordVoiceChannel";

export class DiscordVoiceConnection implements IVoiceConnection {
	private _connection: any;
	private _dispatcher: any;

	constructor(connection) {
		this._connection = connection;
	}

	disconnect(): void {
		this._connection.disconnect();
	}

	getChannel(): IVoiceChannel {
		return new DiscordVoiceChannel(this._connection.channel);
	}

	isSpeaking(): boolean {
		return this._connection.speaking;
	}

	play(resource: string): void {
		this._dispatcher = this._connection.playArbitraryInput(resource);
	}

	pause(silence?: boolean): void {
		this._dispatcher.pause();
	}

	resume(): void {
		this._dispatcher.resume();
	}
}
