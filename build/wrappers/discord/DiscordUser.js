"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordUser = void 0;
const DiscordTextChannel_1 = require("./DiscordTextChannel");
const DiscordServer_1 = require("./DiscordServer");
const ErrorHandler_1 = require("../../utils/ErrorHandler");
class DiscordUser {
    constructor(user) {
        this._member = user;
    }
    getId() {
        return this._member.user.id;
    }
    getName() {
        return this._member.user.username;
    }
    getTag() {
        return this._member.user.tag;
    }
    getServer() {
        if (this._member.user.guild) {
            return new DiscordServer_1.DiscordServer(this._member.user.guild);
        }
        else if (this._member.guild) {
            return new DiscordServer_1.DiscordServer(this._member.guild);
        }
        else {
            ErrorHandler_1.ErrorHandler.log("The user is currently not acting on a server.");
            return null;
        }
    }
    getVoiceChannel() {
        if (this._member.voiceChannelID) {
            let i = 0, voiceChannels = this.getServer().getVoiceChannels();
            while (i < voiceChannels.length) {
                if (voiceChannels[i].getId() === this._member.voiceChannelID) {
                    return voiceChannels[i];
                }
                i++;
            }
        }
        else {
            ErrorHandler_1.ErrorHandler.log("The user is currently not active on a voice channel.");
            return null;
        }
    }
    createDM() {
        return new Promise((resolve, reject) => {
            this._member.user.createDM().then(channel => {
                resolve(new DiscordTextChannel_1.DiscordTextChannel(channel));
            }).catch(reason => {
                reject(reason);
            });
        });
    }
    deleteDM() {
        return new Promise((resolve, reject) => {
            this._member.user.deleteDM().then(channel => {
                resolve(new DiscordTextChannel_1.DiscordTextChannel(channel));
            }).catch(reason => {
                reject(reason);
            });
        });
    }
}
exports.DiscordUser = DiscordUser;
//# sourceMappingURL=DiscordUser.js.map