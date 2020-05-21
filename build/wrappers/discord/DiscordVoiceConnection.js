"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordVoiceConnection = void 0;
const DiscordVoiceChannel_1 = require("./DiscordVoiceChannel");
const ErrorHandler_1 = require("../../utils/ErrorHandler");
const events_1 = require("events");
const EventWrapper_1 = require("../../utils/EventWrapper");
class DiscordVoiceConnection {
    constructor(connection) {
        this._apiEvents = {
            debug: {
                name: "debug",
                returnClass: null,
                isWrapped: false,
                isInitEvent: false
            },
            end: {
                name: "end",
                returnClass: null,
                isWrapped: false,
                isInitEvent: false
            },
            error: {
                name: "error",
                returnClass: null,
                isWrapped: false,
                isInitEvent: false
            },
            speaking: {
                name: "speaking",
                returnClass: null,
                isWrapped: false,
                isInitEvent: false
            },
            start: {
                name: "start",
                returnClass: null,
                isWrapped: false,
                isInitEvent: false
            }
        };
        this._connection = connection;
        this._eventEmitter = new events_1.EventEmitter();
        this._eventEmitter.setMaxListeners(0);
    }
    disconnect() {
        this._connection.disconnect();
    }
    end() {
        if (this._dispatcher) {
            this._dispatcher.end();
        }
    }
    getVoiceChannel() {
        return new DiscordVoiceChannel_1.DiscordVoiceChannel(this._connection.channel);
    }
    isSpeaking() {
        return this._connection.speaking;
    }
    play(resource) {
        this._dispatcher = this._connection.playArbitraryInput(resource);
    }
    pause(silence) {
        this._dispatcher.pause();
    }
    resume() {
        this._dispatcher.resume();
    }
    onEvent(name, listener) {
        if (this._apiEvents.hasOwnProperty(name) && this._dispatcher) {
            let eventWrapper = new EventWrapper_1.EventWrapper(this._dispatcher, this._eventEmitter);
            eventWrapper.registerEvents(this._apiEvents);
            this._eventEmitter.on(name, listener);
        }
        else {
            ErrorHandler_1.ErrorHandler.log(`The event '${name}' could not be attached. The play method must be run first`);
        }
    }
    getAvailableEvents() {
        let events = [];
        for (let name in this._apiEvents) {
            if (this._apiEvents.hasOwnProperty(name)) {
                events.push(this._apiEvents[name].name);
            }
        }
        return events;
    }
    removeAllListeners(name) {
        this._eventEmitter.removeAllListeners(name);
    }
}
exports.DiscordVoiceConnection = DiscordVoiceConnection;
//# sourceMappingURL=DiscordVoiceConnection.js.map