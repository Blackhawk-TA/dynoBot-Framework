import {EventHandler} from "../../utils/EventHandler";

export class SlackEventHandler extends EventHandler {
	constructor(name: string, events: object) {
		super(name, events);
	}

	wrap(originalEmitter: any, wrappedEmitter: EventHandler): void {
		originalEmitter = (args) => {
			//TODO implement
		};
	}
}