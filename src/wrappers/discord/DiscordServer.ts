import {IServer} from "../common/IServer";

export class DiscordServer implements IServer {
	getId(): number {
		return 1;
	}
}