"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BotFramework {
    constructor(Bots) {
        Bots.forEach(Bot => {
            this._client = Bot._client;
        });
    }
    get client() {
        return this._client;
    }
}
exports.BotFramework = BotFramework;
//# sourceMappingURL=BotFramework.js.map