import {IMessage} from "./common/IMessage";

export class MessageDiscord implements IMessage {
	sendMessage(msg: string) {
		console.log("Discord: " + msg);
	}
}