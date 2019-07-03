# dynoBot-Framework
[![license](http://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Blackhawk-TA/dynoBot-Framework/blob/master/LICENSE.md)
[![npm](https://img.shields.io/npm/v/dynobot-framework.svg?color=brightgreen)](https://www.npmjs.com/package/dynobot-framework)
[![github](https://img.shields.io/github/release/Blackhawk-TA/dynoBot-Framework.svg?color=brightgreen)](https://github.com/Blackhawk-TA/dynoBot-Framework/releases)
[![github](https://img.shields.io/github/package-json/v/Blackhawk-TA/dynoBot-Framework/development.svg?color=orange)](https://github.com/Blackhawk-TA/dynoBot-Framework/tree/development)

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

http://dynodoc.tapadventures.com/

### Setup
`npm install dynobot-framework`

Now you can use the framework by adding following line:

```js
const {DiscordBot} = require("dynobot-framework");
```

### Events
Events have to be registered before they can be used. This can be done by the following line:

```js
Bot.getClient().registerEvent("<event-name>");
```

Supported events:
- `error` - returns Error object
- `serverMemberAdd` - returns User object
- `serverMemberRemove` - returns User object
- `message` - returns Message object
- `ready` - no return value

Once a event is registered, it can be used like this:

```js
Bot.getClient().getEvents().on("<event-name>", function (returnValue) {
	//Code that shall be executed when the event was triggered
});
```

### Implementation
There is an open source bot called [dynoBot](https://github.com/Blackhawk-TA/dynoBot) which uses the dynoBot-Framework.
You can take a look at it if you prefer a more realistic implementation example.

There is also an example of a simple bot implementation to get started withk:
```js
const {DiscordBot} = require("dynobot-framework");
const Bot = new DiscordBot("<discord-token>");

Bot.getClient().registerEvent("ready");
Bot.getClient().registerEvent("message");

Bot.getClient().getEvents().on("ready", function() {
	console.log("Bot started");

	Bot.getClient().getEvents().on("message", function(msg) {
		if (msg.isMentioned(Bot.getClient().user)) {
			msg.getChannel().send("OK");
		}
	});
});
```