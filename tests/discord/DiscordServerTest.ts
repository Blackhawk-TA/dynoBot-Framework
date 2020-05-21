import {DiscordServer} from "../../src/wrappers/discord/DiscordServer";
import {DiscordUser} from "../../src/wrappers/discord/DiscordUser";
import {DiscordTextChannel} from "../../src/wrappers/discord/DiscordTextChannel";
import {DiscordRole} from "../../src/wrappers/discord/DiscordRole";
import {DiscordVoiceChannel} from "../../src/wrappers/discord/DiscordVoiceChannel";

const assert = require("assert");

describe("The class DiscordServer", function() {
	beforeEach(function() {
		this.server = {
			id: 123,
			name: "serverName",
			members: {
				array: function() {
					return [];
				}
			},
			channels: {
				array: function() {
					return [];
				}
			},
			roles: {
				array: function() {
					return [];
				}
			}
		};
		this.Server = new DiscordServer(this.server);
	});

	describe("The method getId", function() {
		it("Returns the server id", function() {
			//Act
			let serverId: number = this.Server.getId();

			//Assert
			assert.strictEqual(serverId, 123, "The correct server id was returned.");
		});
	});

	describe("The method getName", function() {
		it("Returns the server name", function() {
			//Act
			let serverName: string = this.Server.getName();

			//Assert
			assert.strictEqual(serverName, "serverName", "The correct server name was returned.");
		});
	});

	describe("The method getMembers", function() {
		it("Returns an empty array because there are no members", function() {
			//Act
			let Members = this.Server.getMembers();

			//Assert
			assert.deepStrictEqual(Members, [], "An empty array was returned.");
		});

		it("Returns an array of wrapped user objects", function() {
			//Arrange
			this.server.members.array = function() {
				return [{
					user: {}
				}, {
					user: {}
				}];
			};

			//Act
			let Members = this.Server.getMembers();

			//Assert
			assert.strictEqual(Members.length, 2, "The correct amount of members was returned.");
			assert.strictEqual(Members[0] instanceof DiscordUser, true, "The first member object was wrapped correctly.");
			assert.strictEqual(Members[1] instanceof DiscordUser, true, "The second member object was wrapped correctly.");
		});
	});

	describe("The method getTextChannels", function() {
		it("Returns an empty array because there are no channels", function() {
			//Act
			let Channels = this.Server.getTextChannels();

			//Assert
			assert.deepStrictEqual(Channels, [], "An empty array was returned.");
		});

		it("Returns an array of wrapped channel objects", function() {
			//Arrange
			this.server.channels.array = function() {
				return [{}, {}];
			};

			//Act
			let Channels = this.Server.getTextChannels();

			//Assert
			assert.strictEqual(Channels.length, 2, "The correct amount of channels was returned.");
			assert.strictEqual(Channels[0] instanceof DiscordTextChannel, true, "The first channel object was wrapped correctly.");
			assert.strictEqual(Channels[1] instanceof DiscordTextChannel, true, "The second channel object was wrapped correctly.");
		});
	});

	describe("The method hasTextChannel", function() {
		it("Returns false because there are no channels", function() {
			//Act
			let hasChannel = this.Server.hasTextChannel("123");

			//Assert
			assert.strictEqual(hasChannel, false, "The channel does not exist.");
		});

		it("Returns false because the requested channel does not exist", function() {
			//Arrange
			this.server.channels.array = function() {
				return [{
					id: "312",
					type: "text"
				}];
			};

			//Act
			let hasChannel = this.Server.hasTextChannel("123");

			//Assert
			assert.strictEqual(hasChannel, false, "The channel does not exist.");
		});

		it("Returns true because the requested channel exists", function() {
			//Arrange
			this.server.channels.array = function() {
				return [{
					id: "123",
					type: "text"
				}];
			};

			//Act
			let hasChannel = this.Server.hasTextChannel("123");

			//Assert
			assert.strictEqual(hasChannel, true, "The channel exists.");
		});
	});

	describe("The method getTextChannel", function() {
		it("Returns nothing because there are no channels", function() {
			//Act
			let channel = this.Server.getTextChannel("123");

			//Assert
			assert.strictEqual(channel, undefined, "The channel does not exist.");
		});

		it("Returns nothing because the requested channel does not exist", function() {
			//Arrange
			this.server.channels.array = function() {
				return [{
					id: "312",
					type: "text"
				}];
			};

			//Act
			let channel = this.Server.getTextChannel("123");

			//Assert
			assert.strictEqual(channel, undefined, "The channel does not exist.");
		});

		it("Returns the requested channel", function() {
			//Arrange
			this.server.channels.array = function() {
				return [{
					id: "312",
					type: "text"
				}, {
					id: "123",
					type: "text"
				}];
			};

			//Act
			let channel = this.Server.getTextChannel("123");

			//Assert
			assert.strictEqual(channel instanceof DiscordTextChannel, true, "The channel exists and was returned.");
		});
	});

	describe("The method getVoiceChannels", function() {
		it("Returns an empty array because there are no channels", function() {
			//Act
			let Channels = this.Server.getVoiceChannels();

			//Assert
			assert.deepStrictEqual(Channels, [], "An empty array was returned.");
		});

		it("Returns an array of wrapped channel objects", function() {
			//Arrange
			this.server.channels.array = function() {
				return [{}, {}];
			};

			//Act
			let Channels = this.Server.getVoiceChannels();

			//Assert
			assert.strictEqual(Channels.length, 2, "The correct amount of channels was returned.");
			assert.strictEqual(Channels[0] instanceof DiscordVoiceChannel, true, "The first channel object was wrapped correctly.");
			assert.strictEqual(Channels[1] instanceof DiscordVoiceChannel, true, "The second channel object was wrapped correctly.");
		});
	});

	describe("The method hasVoiceChannel", function() {
		it("Returns false because there are no channels", function() {
			//Act
			let hasChannel = this.Server.hasVoiceChannel("123");

			//Assert
			assert.strictEqual(hasChannel, false, "The channel does not exist.");
		});

		it("Returns false because the requested channel does not exist", function() {
			//Arrange
			this.server.channels.array = function() {
				return [{
					id: "312",
					type: "voice"
				}];
			};

			//Act
			let hasChannel = this.Server.hasVoiceChannel("123");

			//Assert
			assert.strictEqual(hasChannel, false, "The channel does not exist.");
		});

		it("Returns true because the requested channel exists", function() {
			//Arrange
			this.server.channels.array = function() {
				return [{
					id: "123",
					type: "voice"
				}];
			};

			//Act
			let hasChannel = this.Server.hasVoiceChannel("123");

			//Assert
			assert.strictEqual(hasChannel, true, "The channel exists.");
		});
	});

	describe("The method getVoiceChannel", function() {
		it("Returns undefined because there are no channels", function() {
			//Act
			let channel = this.Server.getVoiceChannel("123");

			//Assert
			assert.strictEqual(channel, undefined, "The channel does not exist.");
		});

		it("Returns undefined because the requested channel does not exist", function() {
			//Arrange
			this.server.channels.array = function() {
				return [{
					id: "312",
					type: "voice"
				}];
			};

			//Act
			let channel = this.Server.getVoiceChannel("123");

			//Assert
			assert.strictEqual(channel, undefined, "The channel does not exist.");
		});

		it("Returns the requested channel", function() {
			//Arrange
			this.server.channels.array = function() {
				return [{
					id: "312",
					type: "voice"
				}, {
					id: "123",
					type: "voice"
				}];
			};

			//Act
			let channel = this.Server.getVoiceChannel("123");

			//Assert
			assert.strictEqual(channel instanceof DiscordVoiceChannel, true, "The channel exists and was returned.");
		});
	});

	describe("The method getRoles", function() {
		it("Returns an empty array because there are no roles", function() {
			//Act
			let Roles = this.Server.getRoles();

			//Assert
			assert.deepStrictEqual(Roles, [], "An empty array was returned.");
		});

		it("Returns an array of wrapped role objects", function() {
			//Arrange
			this.server.roles.array = function() {
				return [{}, {}];
			};

			//Act
			let Roles = this.Server.getRoles();

			//Assert
			assert.strictEqual(Roles.length, 2, "The correct amount of roles was returned.");
			assert.strictEqual(Roles[0] instanceof DiscordRole, true, "The first role object was wrapped correctly.");
			assert.strictEqual(Roles[1] instanceof DiscordRole, true, "The second role object was wrapped correctly.");
		});
	});
});
