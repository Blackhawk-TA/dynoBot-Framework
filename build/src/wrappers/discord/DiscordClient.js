"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const DiscordUser_1 = require("./DiscordUser");
const DiscordServer_1 = require("./DiscordServer");
const DiscordEvent_1 = require("./DiscordEvent");
class DiscordClient {
    constructor(client) {
        this._events = new events_1.EventEmitter();
        this._user = new DiscordUser_1.DiscordUser(client.user);
        this._client = client;
    }
    getEvents() {
        return this._events;
    }
    getUser() {
        return this._user;
    }
    getServers() {
        let servers = this._client.guilds.array();
        let wrappedServers = [];
        servers.forEach(server => {
            wrappedServers.push(new DiscordServer_1.DiscordServer(server));
        });
        return wrappedServers;
    }
    registerEvent(name) {
        let Event = new DiscordEvent_1.DiscordEvent(name);
        let wrappedName = Event.getWrappedName();
        this._client.on(wrappedName, (object) => {
            let WrappedObject = Event.getWrappedObject(object);
            if (WrappedObject) {
                this._events.emit(name, WrappedObject);
            }
            else {
                this._events.emit(name);
            }
        });
    }
}
exports.DiscordClient = DiscordClient;
//# sourceMappingURL=DiscordClient.js.map