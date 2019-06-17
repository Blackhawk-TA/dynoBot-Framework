# Chat bot api wrapper

### Overview
1. [dynoBot-Framework](#dynobot-framework)
2. [Setup](#setup)
3. [Implementation](#implementation)

### dynoBot-Framework
dynoBot-Framework is an chat bot api wrapper which allows you to code your bot independently from chat bot APIs such as the ones from discord or slack.
Currently only discord bots are supported. Slack will follow soon.

### Setup
`npm i dynobot-framework`

Now you can use the framework by adding following line:

```javascript
const {DiscordBot} = require("dynobot-framework");
```

### Implementation
Here is an example of a simple bot:
```javascript
const {DiscordBot} = require("dynobot-framework");
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