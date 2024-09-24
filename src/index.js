const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const { clientReadyHandler } = require("./events/clientReady");
const pingCommand = require("./commands/ping");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.commands = new Collection();

client.commands.set(pingCommand.data.name, pingCommand);

client.on(Events.ClientReady, clientReadyHandler);

client.login(process.env.BOT_TOKEN);
