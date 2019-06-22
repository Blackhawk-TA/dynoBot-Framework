"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DiscordClient_1 = require("./wrappers/discord/DiscordClient");
const Discord = require("discord.js");
const client = new Discord.Client();
class DiscordBot {
    constructor(token) {
        this._client = new DiscordClient_1.DiscordClient(client);
        //Update client once it is logged in
        client.login(token).then(() => {
            this._client = new DiscordClient_1.DiscordClient(client);
        });
    }
    getClient() {
        return this._client;
    }
}
exports.DiscordBot = DiscordBot;
//# sourceMappingURL=DiscordBot.js.map