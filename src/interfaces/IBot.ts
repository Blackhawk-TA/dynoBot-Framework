import {IClient} from "../wrappers/interfaces/IClient";

export interface IBot {
	/**
	 * Gets the wrapped client object from the bot
	 * @return The wrapped client object
	 */
	getClient(): IClient;
}