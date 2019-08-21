import {EventHandler} from "../../utils/EventHandler";
import {SlackApiHandler} from "./SlackApiHandler";

export class SlackEventHandler extends EventHandler {
	private readonly _ApiHandler: SlackApiHandler;

	constructor(name: string, events: object, ApiHandler: SlackApiHandler) {
		super(name, events);

		this._ApiHandler = ApiHandler;
	}

	getWrappedObject(object: any): any {
		let event = this._events[this._wrappedName];
		let WrappedClass = event.returnClass;
		if (WrappedClass) {
			return event.isWrapped ? new WrappedClass(object, this._ApiHandler) : object;
		} else {
			return null;
		}
	}
}