import {IClient} from "../wrappers/interfaces/IClient";

export interface IBot {
	/**
	 * Get the wrapped client object from the bot
	 * @return The wrapped client object
	 */
	getClient(): IClient;
}