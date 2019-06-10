import {IClient} from "../wrappers/common/IClient";

export interface IBot {
	readonly _client: IClient;
}