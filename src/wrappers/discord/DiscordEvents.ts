import {DiscordMessage} from "./DiscordMessage";
import {IEvents} from "../common/IEvents";

//TODO rename
export class DiscordEvents implements IEvents {
	_events: object;

	constructor(msg) {
		this._events = {
			message: new DiscordMessage(msg)
		};
	}

	getEvent(name): any {
		return this._events[name];
	}
}

