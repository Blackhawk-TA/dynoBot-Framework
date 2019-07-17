import {EventHandler} from "../../utils/EventHandler";
import {EventEmitter} from "events";

export class SlackEventHandler extends EventHandler {
	constructor(name: string, events: object) {
		super(name, events);
	}

	wrap(originalEmitter: any, wrappedEmitter: EventEmitter): void {
		originalEmitter.onmessage = (message) => { //TODO replace hardcoding
			wrappedEmitter.emit("message", message);
		};
	}
}