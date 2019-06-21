import {IEvent} from "../interfaces/IEvent";
import {DiscordMessage} from "./DiscordMessage";
import {DiscordUser} from "./DiscordUser";
import {ErrorHandler} from "../../utils/ErrorHandler";

export class DiscordEvent implements IEvent {
	private readonly _name: string;
	private _events = {
		error: {
			name: "error",
			returnClass: Error,
			isWrapped: false
		},
		serverMemberAdd: {
			name: "guildMemberAdd",
			returnClass: DiscordUser,
			isWrapped: true
		},
		serverMemberRemove: {
			name: "guildMemberRemove",
			returnClass: DiscordUser,
			isWrapped: true
		},
		message: {
			name: "message",
			returnClass: DiscordMessage,
			isWrapped: true
		},
		ready: {
			name: "ready",
			returnClass: null,
			isWrapped: false,
		}
	};

	constructor(name: string) {
		if (this._events.hasOwnProperty(name)) {
			this._name = this._events[name].name;
		} else {
			new ErrorHandler(`The event '${name}' is not supported.`).throw();
		}
	}

	getWrappedObject(object: any): any {
		let event = this._events[this._name];
		let WrappedClass = event.returnClass;
		if (WrappedClass) {
			return event.isWrapped ? new WrappedClass(object) : object;
		} else {
			return null;
		}
	}
}

