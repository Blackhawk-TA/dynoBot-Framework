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
			name: "debug",
			returnClass: null,
			isWrapped: false,
			isInitEvent: false
		},
		end: {
			name: "finish",
			returnClass: null,
			isWrapped: false,
			isInitEvent: false
		},
		error: {
			name: "error",
			returnClass: null,
			isWrapped: false,
			isInitEvent: false
		},
		speaking: {
			name: "speaking",
			returnClass: null,
			isWrapped: false,
			isInitEvent: false
		},
		start: {
			name: "start",
			returnClass: null,
			isWrapped: false,
			isInitEvent: false
		}
	};

	constructor(connection) {
		this._connection = connection;
		this._eventEmitter = new EventEmitter();
		this._eventEmitter.setMaxListeners(0);
	}

	disconnect(): void {
		this._connection.disconnect();
	}

	end(): void {
		if (this._dispatcher) {
			this._dispatcher.destroy();
		}
	}

	getVoiceChannel(): IVoiceChannel {
		return new DiscordVoiceChannel(this._connection.channel);
	}

	isSpeaking(): boolean {
		return this._connection.speaking;
	}

	play(resource: string): void {
		this._dispatcher = this._connection.play(resource);
	}

	pause(silence?: boolean): void {
		this._dispatcher.pause(true);
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

	getAvailableEvents(): string[] {
		let events: string[] = [];
		for (let name in this._apiEvents) {
			if (this._apiEvents.hasOwnProperty(name)) {
				events.push(this._apiEvents[name].name);
			}
		}
		return events;
	}

	removeAllListeners(name: string): void {
		this._eventEmitter.removeAllListeners(name);
	}
}
