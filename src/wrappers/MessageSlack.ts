import {IMessage} from "./common/IMessage";

export class MessageSlack implements IMessage {
	sendMessage(msg: string) {
		console.log("Slack: " + msg);
	}
}