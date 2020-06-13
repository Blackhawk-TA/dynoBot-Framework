"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordClient = void 0;
const DiscordUser_1 = require("./DiscordUser");
const DiscordServer_1 = require("./DiscordServer");
const ErrorHandler_1 = require("../../utils/ErrorHandler");
class DiscordClient {
    constructor(client) {
        this._user = new DiscordUser_1.DiscordUser(client);
        this._client = client;
    }
    getUser() {
        return this._user;
    }
    getServers() {
        let servers = this._client.guilds.cache.array();
        let wrappedServers = [];
        servers.forEach(server => {
            wrappedServers.push(new DiscordServer_1.DiscordServer(server));
        });
        return wrappedServers;
    }
    setPresence(text) {
        this._client.user.setPresence({
            activity: { name: text },
            status: "online"
        }).catch(err => {
            ErrorHandler_1.ErrorHandler.log(`Unable to set presence: ${err}`);
        });
    }
}
exports.DiscordClient = DiscordClient;
//# sourceMappingURL=DiscordClient.js.map