import {EventEmitter} from "events";

export class EventHandler {
	private readonly _wrappedName: string;
	private readonly _apiEventName: string;
	private readonly _events: object;
	private readonly _isInitEvent: boolean;

	constructor(name: string, events: object) {
		this._events = events;
		if (events.hasOwnProperty(name)) {
			this._apiEventName = events[name].name;
			this._isInitEvent = events[name].isInitEvent;
			this._wrappedName = name;
		}
	}

	isInitEvent(): boolean {
		return this._isInitEvent;
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

	wrap(originalEmitter: any, wrappedEmitter: EventEmitter): void {
		originalEmitter.on(this.getApiEventName(), (object) => {
			let WrappedObject = this.getWrappedObject(object);
			if (WrappedObject) {
				wrappedEmitter.emit(this._wrappedName, WrappedObject);
			} else {
				wrappedEmitter.emit(this._wrappedName);
			}
		});
	}
}