const { REST, Routes } = require("discord.js");

const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);

async function clientReadyHandler(client) {
  console.log(`Logged in as ${client.user.tag}!`);

  try {
    console.log(`Started refreshing ${client.commands.size} commands.`);

    const data = await rest.put(
      Routes.applicationGuildCommands(
        process.env.DISCORD_CLIENT_ID,
        process.env.GUILD_ID_WILDSTAR
      ),
      {
        body: client.commands.map((command) => {
          return command.data.toJSON();
        }),
      }
    );
    console.log(`Successfully reloaded ${data.length} commands`);
  } catch (err) {
    console.log(err);
  }
}

module.exports = { clientReadyHandler };
