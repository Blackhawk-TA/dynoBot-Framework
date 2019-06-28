# dynoBot-Framework

### Overview
1. [dynoBot-Framework](#dynobot-framework)
2. [Documentation](#documentation)
3. [Setup](#setup)
4. [Events](#events)
4. [Implementation](#implementation)

### dynoBot-Framework
dynoBot-Framework is an chat bot api wrapper which allows you to code your bot independently from chat bot APIs such as the ones from discord or slack.
Currently only discord bots are supported. Slack will follow soon.

### Documentation
You can find a documentation for the dynoBot-Framework here:

http://doc-dynobot.tapadventures.com/

### Setup
`npm i dynobot-framework`

Now you can use the framework by adding following line:

```ecmascript 6
const {DiscordBot} = require("dynobot-framework");
```

### Events
Events have to be registered before they can be used. This can be done by the following line:

```ecmascript 6
Bot.client.registerEvent("<event-name>");
```

Supported events:
- `error` - returns Error object
- `serverMemberAdd` - returns User object
- `serverMemberRemove` - returns User object
- `message` - returns Message object
- `ready` - no return value

Once a event is registered, it can be used like this:

```ecmascript 6
Bot.client.events.on("<event-name>", (returnValue) => {
	//Code that shall be executed when the event was triggered
});
```

### Implementation
There is an open source bot called [dynoBot](https://github.com/Blackhawk-TA/dynoBot) which uses the dynoBot-Framework.
You can take a look at it if you prefer a more realistic implementation example.

There is also an example of a simple bot implementation to get started withk:
```ecmascript 6
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