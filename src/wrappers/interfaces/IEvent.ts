export interface IEvent {
	/**
	 * Gets the name of the original api event
	 * @return The original unwrapped name which the api is using
	 */
	getApiEventName(): string;

	/**
	 * Wraps the api object from the event in a framework object.
	 * @param object
	 */
	getWrappedObject(object: any): any;
}