const { SlashCommandBuilder } = require("@discordjs/builders");

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
  const location = interaction.options.getString("location");
  const units = interaction.options.getString("units") || "metric";

  const forecast = await fetchForecast(location, units);

  const forecastEmbed = {
    color: 0x0099ff,
    title: `Weather forecast for ${forecast.locationName}`,
    fields: forecast.weatherData.map((forecastDay) => {
      return {
        name: forecastDay.date,
        value: `Min: ${forecastDay.temperatureMinC}°C / ${forecastDay.temperatureMinF}°F\nMax: ${forecastDay.temperatureMaxC}°C / ${forecastDay.temperatureMaxF}°F`,
      };
    }),
  };

  await interaction.reply({ embeds: [forecastEmbed] });
}

module.exports = {
  execute,
  data,
};
