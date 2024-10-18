import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

import { clientReadyHandler } from "./events/clientReady";
import * as pingCommand from "./commands/ping";
import * as forecastCommand from "./commands/forecast";
import astroCommand from "./commands/astro";
import { interactionCreateHandler } from "./events/interactionCreateEvent";

const client: Client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.commands = new Collection<string, any>();

client.commands.set(pingCommand.data.name, pingCommand);
client.commands.set(forecastCommand.data.name, forecastCommand);
client.commands.set(astroCommand.data.name, astroCommand);

client.once(Events.ClientReady, clientReadyHandler);

client.on(Events.InteractionCreate, interactionCreateHandler);

client.login(process.env.BOT_TOKEN);
