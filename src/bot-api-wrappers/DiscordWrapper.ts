import {IWrapper} from "./common/IWrapper";


export class DiscordWrapper implements IWrapper {
	constructor() {}

	sendMessage(msg: string) {
		console.log("Discord: " + msg);
	}
}