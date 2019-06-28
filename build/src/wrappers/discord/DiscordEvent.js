"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DiscordMessage_1 = require("./DiscordMessage");
const DiscordUser_1 = require("./DiscordUser");
const ErrorHandler_1 = require("../../utils/ErrorHandler");
class DiscordEvent {
    constructor(name) {
        this._events = {
            error: {
                name: "error",
                returnClass: Error,
                isWrapped: false
            },
            serverMemberAdd: {
                name: "guildMemberAdd",
                returnClass: DiscordUser_1.DiscordUser,
                isWrapped: true
            },
            serverMemberRemove: {
                name: "guildMemberRemove",
                returnClass: DiscordUser_1.DiscordUser,
                isWrapped: true
            },
            message: {
                name: "message",
                returnClass: DiscordMessage_1.DiscordMessage,
                isWrapped: true
            },
            ready: {
                name: "ready",
                returnClass: null,
                isWrapped: false,
            }
        };
        if (this._events.hasOwnProperty(name)) {
            this._name = this._events[name].name;
        }
        else {
            new ErrorHandler_1.ErrorHandler(`The event '${name}' is not supported.`).throw();
        }
    }
    getWrappedObject(object) {
        let event = this._events[this._name];
        let WrappedClass = event.returnClass;
        if (WrappedClass) {
            return event.isWrapped ? new WrappedClass(object) : object;
        }
        else {
            return null;
        }
    }
}
exports.DiscordEvent = DiscordEvent;
//# sourceMappingURL=DiscordEvent.js.map