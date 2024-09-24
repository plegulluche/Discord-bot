const { Client, Events, GatewayIntentBits, REST } = require("discord.js");
require("dotenv").config();

const { clientReadyHandler } = require("./events/clientReady");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.on(Events.ClientReady, clientReadyHandler);

client.login(process.env.BOT_TOKEN);
