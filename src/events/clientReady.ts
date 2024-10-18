import { REST, Routes, Client } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN as string);

export async function clientReadyHandler(client: Client): Promise<void> {
  console.log(`Logged in as ${client.user?.tag}!`);

  try {
    console.log(`Started refreshing ${client.commands.size} commands.`);

    const data = await rest.put(
      Routes.applicationGuildCommands(
        process.env.DISCORD_CLIENT_ID as string,
        process.env.GUILD_ID_WILDSTAR as string
      ),
      {
        body: client.commands.map((command: any) => {
          return command.data.toJSON();
        }),
      }
    ) as any[];
    console.log(`Successfully reloaded ${data.length} commands`);
  } catch (err) {
    console.log(err);
  }
}

