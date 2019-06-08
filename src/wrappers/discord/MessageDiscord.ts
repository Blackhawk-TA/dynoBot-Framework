import {IMessage} from "../common/IMessage";

export class MessageDiscord implements IMessage {
	send(msg: string): void {
		console.log("Discord: " + msg);
	}
}