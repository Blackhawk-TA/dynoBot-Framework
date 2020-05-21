import {IChannel} from "../interfaces/IChannel";
import {IMessage} from "../interfaces/IMessage";
import {IServer} from "../interfaces/IServer";
import {ErrorHandler} from "../../utils/ErrorHandler";
import {SlackApiHandler} from "./utils/SlackApiHandler";
import {SlackMessage} from "./SlackMessage";

export class SlackChannel implements IChannel {
	private readonly _ApiHandler: SlackApiHandler;
	private readonly _channel: any;

	constructor(channel: object, ApiHandler: SlackApiHandler) {
		this._channel = channel;
		this._ApiHandler = ApiHandler;
	}

	awaitMessages(options?: object): Promise<IMessage[]> {
		ErrorHandler.notSupported("Slack", "awaitMessages");
		return null;
	}

	deleteMessages(MessagesToDelete: IMessage[]): Promise<IMessage[]> {
		return new Promise<IMessage[]>((resolve, reject) => {
			let Messages: IMessage[] = [];
			for (let i: number = 0; i < MessagesToDelete.length; i++) {
				MessagesToDelete[i].delete().then((result) => {
					if (result instanceof SlackMessage) {
						Messages.push(result);
					}
					if (i === MessagesToDelete.length - 1) {
						resolve(Messages);
					}
				}).catch(error => {
					reject(error);
				});
			}
		});
	}

	getId(): string {
		return this._channel.id;
	}

	getMessages(amount: number): Promise<IMessage[]> { //TODO check if it works
		let param: object = {
			channel: this._channel.id,
			count: amount
		};

		return new Promise<IMessage[]>((resolve, reject) => {
			this._ApiHandler.callMethod("channels.history", param).then(response => {
				if (response.ok) {
					let Messages: IMessage[] = [];
					response.messages.forEach(message => {
						Messages.push(new SlackMessage(this._ApiHandler, message));
					});
					resolve(Messages);
				} else {
					reject(response);
				}
			}).catch(error => {
				reject(error);
			});
		});
	}

	getName(): string {
		return this._channel.name;
	}

	getServer(): IServer { //TODO wrap
		ErrorHandler.notSupported("Slack", "SlackChannel.getServer");
		return null;
	}

	isTextChannel(): boolean {
		return this._channel.is_channel;
	}

	send(message?: string, options?: any) {
		let params: object = {
			channel: this._channel.id,
			text: message
		};

		this._ApiHandler.callMethod("chat.postMessage", params).catch(error => {
			ErrorHandler.log("There was a problem sending a message: " + error);
		});
	}
}