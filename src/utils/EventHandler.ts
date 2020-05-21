export abstract class EventHandler {
	protected readonly _wrappedName: string;
	private readonly _apiEventName: string;
	private readonly _isInitEvent: boolean;
	protected readonly _events: object;

	protected constructor(name: string, events: object) {
		this._events = events;
		if (events.hasOwnProperty(name)) {
			this._apiEventName = events[name].name;
			this._isInitEvent = events[name].isInitEvent;
			this._wrappedName = name;
		}
	}

	isInitEvent(): boolean {
		return this._isInitEvent;
	}

	getApiEventName(): string {
		return this._apiEventName;
	}
}