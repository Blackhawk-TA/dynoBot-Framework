import {IVoiceConnection} from "../interfaces/IVoiceConnection";
import {IVoiceChannel} from "../interfaces/IVoiceChannel";
import {DiscordVoiceChannel} from "./DiscordVoiceChannel";
import {ErrorHandler} from "../../utils/ErrorHandler";

export class DiscordVoiceConnection implements IVoiceConnection {
	private _connection: any;
	private _dispatcher: any;
	private readonly _apiEvents = {
		end: {
			name: "end"
		}
	};

	constructor(connection) {
		this._connection = connection;
	}

	disconnect(): void {
		this._connection.disconnect();
	}

	getVoiceChannel(): IVoiceChannel {
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

	onEvent(name: string, listener: (...args: any[]) => void): void {
		if (this._apiEvents.hasOwnProperty(name) && this._dispatcher) {
			this._dispatcher.on(name, listener);
		} else {
			ErrorHandler.log(`The event '${name}' could not be attached. The play method must be running first`);
		}
	}
}
