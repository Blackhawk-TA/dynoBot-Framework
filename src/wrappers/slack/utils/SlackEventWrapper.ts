import {EventEmitter} from "events";
import {ErrorHandler} from "../../../utils/ErrorHandler";
import {SlackEventHandler} from "./SlackEventHandler";
import {SlackApiHandler} from "./SlackApiHandler";

export class SlackEventWrapper {
	private readonly _originalEmitter: any;
	private readonly _wrappedEmitter: EventEmitter;
	private readonly _ApiHandler: SlackApiHandler;

	constructor(originalEmitter: any, wrappedEmitter: EventEmitter, ApiHandler: SlackApiHandler) {
		this._originalEmitter = originalEmitter;
		this._wrappedEmitter = wrappedEmitter;
		this._ApiHandler = ApiHandler;
	}

	registerEvents(eventsToRegister: object, excludeInitEvents?: boolean) {
		this._originalEmitter.onerror = error => {
			this._wrappedEmitter.emit("error", error);
		};

		this._originalEmitter.onmessage = message => {
			try {
				let data: any = JSON.parse(message.data),
					type: string = data.type;

				this._ApiHandler.updatePreCalledMethods(type);

				for (let eventName in eventsToRegister) {
					if (eventsToRegister.hasOwnProperty(eventName)) {
						let event = new SlackEventHandler(eventName, eventsToRegister, this._ApiHandler),
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