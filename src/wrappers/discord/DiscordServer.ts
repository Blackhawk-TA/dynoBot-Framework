import {IServer} from "../common/IServer";

export class DiscordServer implements IServer {
	private _server: any;

	constructor(server) {
		this._server = server;
	}

	getId(): number {
		return this._server.id;
	}

	getName(): string {
		return this._server.name
	}
}