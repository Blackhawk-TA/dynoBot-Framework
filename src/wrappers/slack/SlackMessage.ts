import {IMessage} from "../interfaces/IMessage";

export class SlackMessage /*implements IMessage*/ {
	_message: any;

	constructor(message) {
		this._message = message;
	}
}
