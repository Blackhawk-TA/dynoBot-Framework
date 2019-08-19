import {EventHandler} from "../../utils/EventHandler";
import {EventEmitter} from "events";
import {ErrorHandler} from "../../utils/ErrorHandler";

export class SlackEventHandler extends EventHandler {
	constructor(name: string, events: object) {
		super(name, events);
	}

	wrap(originalEmitter: any, wrappedEmitter: EventEmitter): void {
		if (this._wrappedName === "error") {
			originalEmitter.onerror = (error) => { //TODO not working
				wrappedEmitter.emit("error", error);
			};
		} else {
			originalEmitter.onmessage = (message) => {
				try {
					let data: any = JSON.parse(message.data),
						type: string = data.type;

					console.log(this.getApiEventName(), type);
					if (this.getApiEventName() === type) {
						console.log("Wrapped: ", this.getWrappedObject(data), data);
						wrappedEmitter.emit(this._wrappedName, this.getWrappedObject(data));
					}
				} catch (e) {
					ErrorHandler.log("There was a problem wrapping the event data: " + e);
				}
			};
		}
	}
}