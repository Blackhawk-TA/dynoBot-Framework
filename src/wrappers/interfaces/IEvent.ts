export interface IEvent {
	/**
	 * Gets the wrapped event name
	 * @return The wrapped event name
	 */
	getWrappedName(): string;

	/**
	 * Wraps the api object from the event in a framework object.
	 * @param object
	 */
	getWrappedObject(object: any): any;
}