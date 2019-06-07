import {IMessage} from "./common/IMessage";

export class MessageSlack implements IMessage {
	send(msg: string) {
		console.log("Slack: " + msg);
	}
}