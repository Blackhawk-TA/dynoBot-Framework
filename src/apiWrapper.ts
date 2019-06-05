import {DiscordWrapper} from "./bot-api-wrappers/DiscordWrapper";
import {SlackWrapper} from "./bot-api-wrappers/SlackWrapper";
import * as helper from "./utils/helper";

const Discord = new DiscordWrapper;
const Slack = new SlackWrapper;

helper.help("OK"); //Shows how to call js helper functions within ts

exports.selectAPI = function(type: number) { //TODO later: select automatically which API is needed
	switch (type) {
		case 0:
			return Discord;
		case 1:
			return Slack;
		default:
			return null;
	}
};
