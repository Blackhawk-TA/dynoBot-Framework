import {IServer} from "./common/IServer";

export class ServerSlack implements IServer {
	getId() {
		return 1;
	}
}