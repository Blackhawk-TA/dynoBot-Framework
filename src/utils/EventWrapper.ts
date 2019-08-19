import {EventEmitter} from "events";
import {DiscordEventHandler} from "../wrappers/discord/DiscordEventHandler";
import {SlackEventHandler} from "../wrappers/slack/SlackEventHandler";

export class EventWrapper {
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
				let Event: SlackEventHandler = new this._EventHandler(name, eventsToRegister); //TODO modify for slack
				let excludeEvent = excludeInitEvents ? Event.isInitEvent() : false;

				if (!excludeEvent) {
					Event.wrap(this._originalEmitter, this._wrappedEmitter);
				}
			}
		}
	}
}