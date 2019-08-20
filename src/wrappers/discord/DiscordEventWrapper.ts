import {EventEmitter} from "events";
import {DiscordEventHandler} from "./DiscordEventHandler";

export class DiscordEventWrapper {
	private readonly _originalEmitter: any;
	private readonly _wrappedEmitter: EventEmitter;
	private readonly _EventHandler: any;

	constructor(originalEmitter: any, wrappedEmitter: EventEmitter, EventHandler: any) {
		this._originalEmitter = originalEmitter;
		this._wrappedEmitter = wrappedEmitter;
		this._EventHandler = EventHandler;
	}

	registerEvents(eventsToRegister: object, excludeInitEvents?: boolean) {
		for (let name in eventsToRegister) {
			if (eventsToRegister.hasOwnProperty(name)) {
				let Event: DiscordEventHandler = new this._EventHandler(name, eventsToRegister);
				let excludeEvent = excludeInitEvents ? Event.isInitEvent() : false;

				if (!excludeEvent) {
					Event.wrap(this._originalEmitter, this._wrappedEmitter);
				}
			}
		}
	}
}