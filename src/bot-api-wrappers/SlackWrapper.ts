import {IWrapper} from "./common/IWrapper";


export class SlackWrapper implements IWrapper {
	constructor() {}

	sendMessage(msg: string) {
		console.log("Slack: " + msg);
	}
}