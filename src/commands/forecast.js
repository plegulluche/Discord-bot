const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders");
const { fetchForecast } = require("../requests/forecast");

const data = new SlashCommandBuilder()
  .setName("forecast")
  .setDescription("Replies with the weather forecast for a specific location")
  .addStringOption((option) => {
    return option
      .setName("location")
      .setDescription(
        "The location can be a city, a zip/postal code, or a lat & long"
      )
      .setRequired(true);
  })
  .addStringOption((option) => {
    return option
      .setName("units")
      .setDescription(
        'The unit system of the results: either "metric" or "imperial"'
      )
      .setRequired(false)
      .addChoices(
        {
          name: "Metric",
          value: "metric",
        },
        {
          name: "Imperial",
          value: "imperial",
        }
      );
  });

async function execute(interaction) {
  // Trigger an ephemeral message saying that the bot is thinking ...
  // This is useful for long running commands
  // Act as initial response to confirm to discord taht we did receive the interaction 
  // We have 15 minutes to respond to the interaction
  await interaction.deferReply();

  const location = interaction.options.getString("location");
  const units = interaction.options.getString("units") || "metric";
  const isMetric = units === "metric";

  const { weatherData, locationName } = await fetchForecast(location);

  const embed = new EmbedBuilder()
    .setColor(0x3f704d)
    .setTitle(`Weather forecast for ${locationName}`)
    .setDescription(`Using the ${units} unit system`)
    .setTimestamp()
    .setFooter({
        text: 'Powered by WeatherAPI.com',
    });
  for (const day of weatherData) {
    const temperatureMin = isMetric
      ? day.temperatureMinC
      : day.temperatureMinF;
      const temperatureMax = isMetric
      ? day.temperatureMaxC
      : day.temperatureMaxF;

    embed.addField({
        name: day.date,
        value: `⬇️ Min: ${temperatureMin}°,⬆️ Max: ${temperatureMax}°`,
        inline
    });
  }
  // passing an array because we can send multiple embeds
  await interaction.editReply({
    embeds: [embed,]
  });
}

module.exports = {
  execute,
  data,
};
