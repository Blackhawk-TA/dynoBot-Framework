export interface IChannel {
	send(msg: string): void; //TODO allow more than a string as msg
}