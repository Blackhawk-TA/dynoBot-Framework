import {EventHandler} from "../../utils/EventHandler";

export class SlackEventHandler extends EventHandler {
	constructor(name: string, events: object) {
		super(name, events);
	}
}