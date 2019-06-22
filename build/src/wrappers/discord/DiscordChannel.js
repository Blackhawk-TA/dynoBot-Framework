"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DiscordServer_1 = require("./DiscordServer");
const DiscordMessage_1 = require("./DiscordMessage");
class DiscordChannel {
    constructor(channel) {
        this._channel = channel;
    }
    send(message, options) {
        this._channel.send(message, options);
    }
    getId() {
        return this._channel.id;
    }
    getName() {
        return this._channel.name;
    }
    getServer() {
        return new DiscordServer_1.DiscordServer(this._channel.guild);
    }
    getMessages(amount) {
        return new Promise((resolve, reject) => {
            this._channel.fetchMessages({ limit: amount }).then((messages) => {
                let Messages = [];
                messages.forEach(message => {
                    Messages.push(new DiscordMessage_1.DiscordMessage(message));
                });
                resolve(Messages);
            }).catch(error => {
                reject(error);
            });
        });
    }
    deleteMessages(messages) {
        return new Promise((resolve, reject) => {
            let Messages = [];
            for (let i = 0; i < messages.length; i++) {
                let Message = new DiscordMessage_1.DiscordMessage(messages[i]);
                Message.delete().then((result) => {
                    if (result instanceof DiscordMessage_1.DiscordMessage) {
                        Messages.push(result);
                    }
                    if (i === messages.length - 1) {
                        resolve(Messages);
                    }
                }).catch(error => {
                    reject(error);
                });
            }
        });
    }
    awaitMessages(options) {
        return new Promise((resolve, reject) => {
            this._channel.awaitMessages(function () { return true; }, options).then(messages => {
                let Messages = [];
                messages.array().forEach(message => {
                    Messages.push(new DiscordMessage_1.DiscordMessage(message));
                });
                resolve(Messages);
            }).catch(reason => {
                reject(reason);
            });
        });
    }
}
exports.DiscordChannel = DiscordChannel;
//# sourceMappingURL=DiscordChannel.js.map