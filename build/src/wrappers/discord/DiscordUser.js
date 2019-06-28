"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DiscordChannel_1 = require("./DiscordChannel");
class DiscordUser {
    constructor(user) {
        this._user = user;
    }
    getId() {
        return this._user.id;
    }
    getName() {
        return this._user.username;
    }
    createDM() {
        return new Promise((resolve, reject) => {
            this._user.createDM().then(channel => {
                resolve(new DiscordChannel_1.DiscordChannel(channel));
            }).catch(reason => {
                reject(reason);
            });
        });
    }
    deleteDM() {
        return new Promise((resolve, reject) => {
            this._user.deleteDM().then(channel => {
                resolve(new DiscordChannel_1.DiscordChannel(channel));
            }).catch(reason => {
                reject(reason);
            });
        });
    }
}
exports.DiscordUser = DiscordUser;
//# sourceMappingURL=DiscordUser.js.map