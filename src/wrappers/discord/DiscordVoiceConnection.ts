import {IVoiceConnection} from "../interfaces/IVoiceConnection";
import {IVoiceChannel} from "../interfaces/IVoiceChannel";
import {DiscordVoiceChannel} from "./DiscordVoiceChannel";
import {ErrorHandler} from "../../utils/ErrorHandler";
import {EventEmitter} from "events";
import {EventWrapper} from "../../utils/EventWrapper";

export class DiscordVoiceConnection implements IVoiceConnection {
	private _connection: any;
	private _dispatcher: any;
	private readonly _eventEmitter: EventEmitter;
	private readonly _apiEvents = {
		debug: {
			name: "debug"
		},
		end: {
			name: "end"
		},
		error: {
			name: "error"
		},
		speaking: {
			name: "speaking"
		},
		start: {
			name: "start"
		}
	};

	constructor(connection) {
		this._connection = connection;
		this._eventEmitter = new EventEmitter();
	}

	disconnect(): void {
		this._connection.disconnect();
	}

	end(): void {
		if (this._dispatcher) {
			this._dispatcher.end();
		}
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
			let eventWrapper: EventWrapper = new EventWrapper(this._dispatcher, this._eventEmitter);
			eventWrapper.registerEvents(this._apiEvents);

			this._eventEmitter.on(name, listener);
		} else {
			ErrorHandler.log(`The event '${name}' could not be attached. The play method must be run first`);
		}
	}

	removeAllListeners(name: string): void {
		this._eventEmitter.removeAllListeners(name);
	}
}
