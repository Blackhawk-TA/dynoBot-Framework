import {IVoiceChannel} from "../interfaces/IVoiceChannel";
import {IUser} from "../interfaces/IUser";
import {IServer} from "../interfaces/IServer";

export class DiscordVoiceChannel implements IVoiceChannel {
	private _channel: any;

	constructor(channel: object) {
		this._channel = channel;
	}

	createInvite(options: { temporary?: boolean; maxAge?: number; maxUses?: number; unique?: boolean; reason?: string }) {
	}

	getId(): number {
		return this._channel.id;
	}

	getMembers(): IUser[] {
		return [];
	}

	getName(): boolean {
		return this._channel.name;
	}

	getServer(): IServer {
		return undefined;
	}

	getUserLimit(): number {
		return this._channel.userLimit;
	}

	isDeletable(): boolean {
		return false;
	}

	wasDeleted(): boolean {
		return this._channel.deleted;
	}

	isEditable(): boolean {
		return false;
	}

	isFull(): boolean {
		return false;
	}

	isJoinable(): boolean {
		return false;
	}

	join(): void {
	}

	leave(): void {
	}

	pauseAudio(silence?: boolean): void {
	}

	playAudio(): void {
	}

	resumeAudio(): void {
	}

	stopAudio(): void {
	}
}
