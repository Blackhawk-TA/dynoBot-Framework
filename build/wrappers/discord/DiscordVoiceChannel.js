"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordVoiceChannel = void 0;
const DiscordServer_1 = require("./DiscordServer");
const DiscordUser_1 = require("./DiscordUser");
const DiscordVoiceConnection_1 = require("./DiscordVoiceConnection");
class DiscordVoiceChannel {
    constructor(channel) {
        this._channel = channel;
    }
    getId() {
        return this._channel.id;
    }
    getMembers() {
        let members = this._channel.members.array(), Members = [];
        members.forEach(member => {
            Members.push(new DiscordUser_1.DiscordUser(member));
        });
        return Members;
    }
    getName() {
        return this._channel.name;
    }
    getServer() {
        return new DiscordServer_1.DiscordServer(this._channel.guild);
    }
    getUserLimit() {
        return this._channel.userLimit;
    }
    getConnection() {
        if (this._connection) {
            return this._connection;
        }
        else {
            return null;
        }
    }
    isDeletable() {
        return this._channel.deletable;
    }
    wasDeleted() {
        return this._channel.deleted;
    }
    isFull() {
        return this._channel.full;
    }
    canJoin() {
        return this._channel.joinable;
    }
    join() {
        return new Promise((resolve, reject) => {
            this._channel.join().then(connection => {
                this._connection = new DiscordVoiceConnection_1.DiscordVoiceConnection(connection);
                resolve(this._connection);
            }).catch(error => {
                reject(error);
            });
        });
    }
    leave() {
        this._channel.leave();
    }
}
exports.DiscordVoiceChannel = DiscordVoiceChannel;
//# sourceMappingURL=DiscordVoiceChannel.js.map