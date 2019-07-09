import {ErrorHandler} from "./ErrorHandler";
import {IUser} from "../wrappers/interfaces/IUser";
import {IServer} from "../wrappers/interfaces/IServer";
import {IClient} from "../wrappers/interfaces/IClient";
import {EventHandler} from "./EventHandler";

/**
 * Pre-initializes the Client class to make sure it included the initialisation event
 * It will be overwritten by the real Client class one the bot is connected to the api
 */
export class PreInitClient implements IClient{ //TODO use this method for DiscordBot as well + unit tests
	private readonly _apiEvents: object;
	private _client: any;

	constructor(apiEvents: object) {
		this._client = {};
		this._apiEvents = apiEvents;
	}

	/**
	 * Implements a pre-init onEvent class which only accepts the init event
	 * @param name - The name of the event
	 * @param listener - The event listener, a function which shall be executed once the event was triggered
	 */
	onEvent(name: string, listener: (...args: any[]) => void): void {
		let InitEvent: EventHandler = new EventHandler(name, this._apiEvents);
		let apiInitEventName: string = InitEvent.getApiEventName();
		if (name === apiInitEventName && InitEvent.isInitEvent()) {
			this._client.on(apiInitEventName, listener); //TODO check wrapping & finish implementing this
		} else {
			ErrorHandler.throwErrorMessage(`Before using any events, the initialisation event has to be triggered`);
		}
	}

	getUser(): IUser {
		ErrorHandler.throwErrorMessage("Cannot get user: The bot has not been initialised yet.");
		return null;
	}

	getServers(): IServer[] {
		ErrorHandler.throwErrorMessage("Cannot get servers: The bot has not been initialised yet.");
		return null;
	}
}