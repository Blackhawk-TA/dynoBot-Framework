"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordUser = void 0;
const DiscordTextChannel_1 = require("./DiscordTextChannel");
const DiscordServer_1 = require("./DiscordServer");
class DiscordUser {
    constructor(member) {
        this._user = member.user || member;
        this._member = member;
    }
    getId() {
        return this._user.id;
    }
    getName() {
        return this._user.username;
    }
    getTag() {
        return this._user.tag;
    }
    getServer() {
        if (this._user.guild) {
            return new DiscordServer_1.DiscordServer(this._member.user.guild);
        }
        else if (this._member.guild) {
            return new DiscordServer_1.DiscordServer(this._member.guild);
        }
        else {
            return null;
        }
    }
    getVoiceChannel() {
        if (this._member.voice && this._member.voice.channelID) {
            let i = 0, voiceChannels = this.getServer().getVoiceChannels();
            while (i < voiceChannels.length) {
                if (voiceChannels[i].getId() === this._member.voice.channelID) {
                    return voiceChannels[i];
                }
                i++;
            }
        }
        else {
            return null;
        }
    }
    createDM() {
        return new Promise((resolve, reject) => {
            this._user.createDM().then(channel => {
                resolve(new DiscordTextChannel_1.DiscordTextChannel(channel));
            }).catch(reason => {
                reject(reason);
            });
        });
    }
    deleteDM() {
        return new Promise((resolve, reject) => {
            this._user.deleteDM().then(channel => {
                resolve(new DiscordTextChannel_1.DiscordTextChannel(channel));
            }).catch(reason => {
                reject(reason);
            });
        });
    }
}
exports.DiscordUser = DiscordUser;
//# sourceMappingURL=DiscordUser.js.map