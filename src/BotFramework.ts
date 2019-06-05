import {IMessage} from "./wrappers/common/IMessage";
import {MessageDiscord} from "./wrappers/MessageDiscord";
import {MessageSlack} from "./wrappers/MessageSlack";

module.exports = class BotFramework {
	wrapper: IMessage;

	//TODO support also other interfaces like IServer
	constructor(wrapperName: string) {
		switch (wrapperName) {
			case "Discord":
				this.wrapper = new MessageDiscord();
				break;
			case "Slack":
				this.wrapper = new MessageSlack();
				break;
			default:
				break;
		}
	}

	sendMessage(msg: string) {
		this.wrapper.sendMessage(msg);
	}
};
