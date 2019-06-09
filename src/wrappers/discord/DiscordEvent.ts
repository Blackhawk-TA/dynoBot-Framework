import {DiscordMessage} from "./DiscordMessage";
import {IEvent} from "../common/IEvent";

export class DiscordEvent implements IEvent {
	private readonly _name: string;
	private _events = {
		message: DiscordMessage
	};

	constructor(name: string) {
		if (this._events.hasOwnProperty(name)) {
			this._name = name;
		} else {
			throw new Error(`The event '${name}' is not supported.`);
		}
	}

	getWrappedObject(object: any): any {
		let WrappedClass = this._events[this._name];
		return new WrappedClass(object);
	}
}

