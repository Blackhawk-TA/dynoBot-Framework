export interface IEventWrapper {
	registerEvents(eventsToRegister: object, excludeInitEvents?: boolean);
}