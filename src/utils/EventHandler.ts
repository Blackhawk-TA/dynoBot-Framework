import {ErrorHandler} from "./ErrorHandler";

export class EventHandler {
	private readonly _wrappedName: string;
	private readonly _apiEventName: string;
	private readonly _events: object;

	constructor(name: string, events: object) {
		this._events = events;
		if (events.hasOwnProperty(name)) {
			this._apiEventName = events[name].name;
			this._wrappedName = name;
		} else {
			ErrorHandler.throwErrorMessage(`The event '${name}' is not supported.`);
		}
	}

	getApiEventName(): string {
		return this._apiEventName;
	}

	getWrappedObject(object: any): any {
		let event = this._events[this._wrappedName];
		let WrappedClass = event.returnClass;
		if (WrappedClass) {
			return event.isWrapped ? new WrappedClass(object) : object;
		} else {
			return null;
		}
	}
}