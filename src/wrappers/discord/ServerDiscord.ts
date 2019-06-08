import {IServer} from "../common/IServer";

export class ServerDiscord implements IServer {
	getId(): number {
		return 1;
	}
}