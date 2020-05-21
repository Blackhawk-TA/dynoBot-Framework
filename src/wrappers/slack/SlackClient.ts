import {IClient} from "../interfaces/IClient";
import {IUser} from "../interfaces/IUser";
import {EventEmitter} from "events";
import {IServer} from "../interfaces/IServer";
import {ErrorHandler} from "../../utils/ErrorHandler";
import {SlackUser} from "./SlackUser";
import {SlackApiHandler} from "./utils/SlackApiHandler";

export class SlackClient implements IClient {
	private readonly _events: EventEmitter;
	private readonly _client: any;
	private readonly _botId: string;
	private readonly _ApiHandler: SlackApiHandler;
	private _user: IUser;

	constructor(client: any, botId, ApiHandler: SlackApiHandler) {
		this._events = new EventEmitter();
		this._client = client;
		this._botId = botId;
		this._ApiHandler = ApiHandler;
	}

	getUser(): IUser {
		let returnValues = this._ApiHandler.getPreCalledMethod("users.list");

		returnValues.members.forEach(member => {
			if (member.id === this._botId) {
				this._user = member;
			}
		});
		return new SlackUser(this._user, this._ApiHandler);
	}

	getServers(): IServer[] {
		ErrorHandler.notSupported("Slack", "getServers");
		return null;
	}
}
