export interface IClient {
	on(eventName: string): any;
	login(token: string): void;
}