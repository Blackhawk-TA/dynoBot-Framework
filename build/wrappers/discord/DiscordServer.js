"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordServer = void 0;
const DiscordUser_1 = require("./DiscordUser");
const DiscordTextChannel_1 = require("./DiscordTextChannel");
const DiscordRole_1 = require("./DiscordRole");
const DiscordVoiceChannel_1 = require("./DiscordVoiceChannel");
class DiscordServer {
    constructor(server) {
        this._server = server;
    }
    getId() {
        return this._server.id;
    }
    getName() {
        return this._server.name;
    }
    getMembers() {
        return this.getOnlineMembers();
    }
    getOnlineMembers() {
        let members = this._server.members.cache.array(), Members = [];
        members.forEach(member => {
            Members.push(new DiscordUser_1.DiscordUser(member));
        });
        return Members;
    }
    getMemberById(id) {
        return new Promise((resolve, reject) => {
            this._server.members.fetch(id).then(member => {
                resolve(new DiscordUser_1.DiscordUser((member)));
            }).catch(error => {
                reject(error);
            });
        });
    }
    getTextChannels() {
        let channels = this._server.channels.cache.array(), Channels = [];
        channels.forEach(channel => {
            Channels.push(new DiscordTextChannel_1.DiscordTextChannel(channel));
        });
        return Channels;
    }
    getTextChannel(channelId) {
        let i = 0, channels = this._server.channels.cache.array();
        while (i < channels.length) {
            if (channels[i].id === channelId && channels[i].type === "text") {
                return new DiscordTextChannel_1.DiscordTextChannel(channels[i]);
            }
            i++;
        }
    }
    hasTextChannel(channelId) {
        let i = 0, channels = this._server.channels.cache.array();
        while (i < channels.length) {
            if (channels[i].id === channelId && channels[i].type === "text") {
                return true;
            }
            i++;
        }
        return false;
    }
    getVoiceChannels() {
        let channels = this._server.channels.cache.array(), Channels = [];
        channels.forEach(channel => {
            Channels.push(new DiscordVoiceChannel_1.DiscordVoiceChannel(channel));
        });
        return Channels;
    }
    getVoiceChannel(channelId) {
        let i = 0, channels = this._server.channels.cache.array();
        while (i < channels.length) {
            if (channels[i].id === channelId && channels[i].type === "voice") {
                return new DiscordVoiceChannel_1.DiscordVoiceChannel(channels[i]);
            }
            i++;
        }
    }
    hasVoiceChannel(channelId) {
        let i = 0, channels = this._server.channels.cache.array();
        while (i < channels.length) {
            if (channels[i].id === channelId && channels[i].type === "voice") {
                return true;
            }
            i++;
        }
        return false;
    }
    getRoles() {
        let roles = this._server.roles.cache.array(), Roles = [];
        roles.forEach(role => {
            Roles.push(new DiscordRole_1.DiscordRole(role));
        });
        return Roles;
    }
}
exports.DiscordServer = DiscordServer;
//# sourceMappingURL=DiscordServer.js.map