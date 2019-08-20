import {EventEmitter} from "events";
import {ErrorHandler} from "../../utils/ErrorHandler";

export class SlackEventWrapper {
	private readonly _originalEmitter: any;
	private readonly _wrappedEmitter: EventEmitter;
	private readonly _EventHandler: any;

	constructor(originalEmitter: any, wrappedEmitter: EventEmitter, EventHandler: any) {
		this._originalEmitter = originalEmitter;
		this._wrappedEmitter = wrappedEmitter;
		this._EventHandler = EventHandler;
	}

	registerEvents(eventsToRegister: object, excludeInitEvents?: boolean) {
		this._originalEmitter.onerror = error => {
			this._wrappedEmitter.emit("error", error);
		};

		this._originalEmitter.onmessage = message => {
			try {
				let data: any = JSON.parse(message.data),
					type: string = data.type;

				for (let eventName in eventsToRegister) {
					if (eventsToRegister.hasOwnProperty(eventName)) {
						let event = eventsToRegister[eventName],
							excludeEvent = excludeInitEvents ? event.isInitEvent : false;

						if (event.name === type && !excludeEvent) {
							this._wrappedEmitter.emit(eventName, data);
						}
					}
				}
			} catch (e) {
				ErrorHandler.log("There was a problem wrapping the event data: " + e);
			}
		};
	}
}