import {IServer} from "./common/IServer";

export class ServerSlack implements IServer {
	getId() {
		console.log("got Id 1");
		return 1;
	}
}