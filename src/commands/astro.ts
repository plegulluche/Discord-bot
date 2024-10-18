const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders");
const { fetchForecast } = require("../requests/forecast");

const data = new SlashCommandBuilder()
  .setName("astro")
  .setDescription("Replies with the astronomical information for the day")
  .addStringOption((option) => {
    return option
      .setName("location")
      .setDescription(
        "The location can be a city, a zip/postal code, or a lat & long"
      )
      .setRequired(true);
  });

async function execute(interaction) {
  // Trigger an ephemeral message saying that the bot is thinking ...
  // This is useful for long running commands
  // Act as initial response to confirm to discord taht we did receive the interaction
  // We have 15 minutes to respond to the interaction
  await interaction.deferReply();

  const location = interaction.options.getString("location");

  try {
    const { weatherData, locationName } = await fetchForecast(location);

    const embed = new EmbedBuilder()
      .setColor(0x3f704d)
      .setTitle(`Astronomical forecast for ${locationName}`)
      .setTimestamp()
      .setFooter({
        text: "Powered by WeatherAPI.com",
      });
    for (const day of weatherData) {
      embed.addFields({
        name: day.date,
        value: `Sunrise 🌅 : ${day.sunriseTime}\nSunset 🌇 : ${day.sunsetTime}\nMoonrise 🌕 : ${day.moonriseTime}\nMoonset 🌑 : ${day.moonsetTime}`,
      });
    }
    // passing an array because we can send multiple embeds
    await interaction.editReply({
      embeds: [embed],
    });
  } catch (error) {
    await interaction.editReply(error);
  }
}

module.exports = {
  execute,
  data,
};
