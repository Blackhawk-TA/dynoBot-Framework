export interface IEvent {
	/**
	 * Wraps the api object from the event in a framework object.
	 * @param object
	 */
	getWrappedObject(object: any): any;
}