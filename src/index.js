const { Client, Events, GatewayIntentBits, REST } = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.on(Events.ClientReady, () => {
  console.log("Bot is ready");
});

client.login(process.env.BOT_TOKEN);
