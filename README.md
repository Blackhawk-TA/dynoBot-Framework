# Chat bot api wrapper

### Overview
1. [The chat bot api wrapper](#the-chat-bot-api-wrapper)
2. [Setup](#setup)
3. [Implementation](#implementation)

### The chat bot api wrapper
The chat bot api wrapper allows you to code your bot independently from chat bot APIs such as the ones from discord or slack.
Currently only discord bots are supported. Slack will follow soon.

### Setup
Add the latest build to your dependencies in the package.json file.
You can find the latest build on [GitHub](https://github.com/Blackhawk-TA/chatbot-api-wrapper/releases).

It should look like this:
```json5
"dependencies": {
    "chatbot-api-wrapper": "https://github.com/Blackhawk-TA/chatbot-api-wrapper/archive/<build-version>.tar.gz"
}
```

Now you can use the framework by adding following line:

```javascript
const {DiscordBot} = require("chatbot-api-wrapper");
```

### Implementation

Here is an example for a simple bot:
```javascript
const {DiscordBot} = require("chatbot-api-wrapper");
const Bot = new DiscordBot("<discord-token>");

Bot.client.registerEvent("ready");
Bot.client.registerEvent("message");

Bot.client.events.on("ready", () => {
	console.log("Bot started");

	Bot.client.events.on("message", (msg) => {
		if (msg.isMentioned(bot.client.user)) {
			msg.channel.send("OK");
		}
	});
});
```