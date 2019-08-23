import {IChannel} from "../interfaces/IChannel";
import {IMessage} from "../interfaces/IMessage";
import {IServer} from "../interfaces/IServer";

export class SlackChannel implements IChannel {
	private readonly _channel: any;

	constructor(channel: object) {
		this._channel = channel;
	}

	awaitMessages(options?: object): Promise<IMessage[]> {
		return undefined;
	}

	deleteMessages(MessagesToDelete: IMessage[]): Promise<IMessage[]> {
		return undefined;
	}

	getId(): number {
		return 0;
	}

	getMessages(amount: number): Promise<IMessage[]> {
		return undefined;
	}

	getName(): string {
		return "";
	}

	getServer(): IServer {
		return undefined;
	}

	isTextChannel(): boolean {
		return false;
	}

	send(message?: string, options?: any) {
	}
}