import {IServer} from "./common/IServer";

export class ServerDiscord implements IServer {
	getId() {
		console.log("got Id 1");
		return 1;
	}
}