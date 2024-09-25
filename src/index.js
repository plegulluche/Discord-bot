const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const { clientReadyHandler } = require("./events/clientReady");
const pingCommand = require("./commands/ping");
const forecastCommand = require("./commands/forecast");
const { interactionCreateHandler } = require("./events/interactionCreateEvent");


const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.commands = new Collection();

client.commands.set(pingCommand.data.name, pingCommand);
client.commands.set(forecastCommand.data.name, forecastCommand);

client.once(Events.ClientReady, clientReadyHandler);

client.on(Events.InteractionCreate, interactionCreateHandler);

client.login(process.env.BOT_TOKEN);
