import {EventEmitter} from "events";
import {ErrorHandler} from "../../utils/ErrorHandler";
import {SlackEventHandler} from "./SlackEventHandler";
import {IEventWrapper} from "../interfaces/IEventWrapper";

export class SlackEventWrapper implements IEventWrapper {
	private readonly _originalEmitter: any;
	private readonly _wrappedEmitter: EventEmitter;

	constructor(originalEmitter: any, wrappedEmitter: EventEmitter) {
		this._originalEmitter = originalEmitter;
		this._wrappedEmitter = wrappedEmitter;
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
						let event = new SlackEventHandler(eventName, eventsToRegister),
							excludeEvent = excludeInitEvents ? event.isInitEvent() : false;

						if (event.getApiEventName() === type && !excludeEvent) {
							this._wrappedEmitter.emit(eventName, event.getWrappedObject(data));
						}
					}
				}
			} catch (e) {
				ErrorHandler.log("There was a problem wrapping the event data: " + e);
			}
		};
	}
}