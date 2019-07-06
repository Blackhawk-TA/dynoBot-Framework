import {IEvent} from "../interfaces/IEvent";
import {ErrorHandler} from "../../utils/ErrorHandler";

export class SlackEvent implements IEvent{
	private readonly _wrappedName: string;
	private readonly _apiEventName: string;
	private _events = {
		error: {
			name: "onerror",
			returnClass: Error, //TODO check if it shall be wrapped
			isWrapped: false
		},
		message: {
			name: "onmessage",
			returnClass: null,
			isWrapped: true
		},
		ready: {
			name: "onopen",
			returnClass: null,
			isWrapped: false,
		}
	};

	constructor(name: string) {
		if (this._events.hasOwnProperty(name)) {
			this._apiEventName = this._events[name].name;
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