import {IMessage} from "./common/IMessage";

export class MessageDiscord implements IMessage {
	send(msg: string) {
		console.log("Discord: " + msg);
	}
}