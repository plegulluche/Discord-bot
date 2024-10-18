import {
  SlashCommandBuilder,
  EmbedBuilder,
  CommandInteraction,
} from "discord.js";
import { fetchForecast } from "../requests/forecast";

export const data = new SlashCommandBuilder()
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

export async function execute(interaction: CommandInteraction): Promise<void> {
  // Trigger an ephemeral message saying that the bot is thinking ...
  // This is useful for long running commands
  // Act as initial response to confirm to discord taht we did receive the interaction
  // We have 15 minutes to respond to the interaction
  await interaction.deferReply();

  const location = interaction.options.get("location", true)?.value as string;
  const units = (interaction.options.get("units")?.value as string) || "metric";
  const isMetric = units === "metric";
  try {
    const { weatherData, locationName }: any = await fetchForecast(location);

    const embed = new EmbedBuilder()
      .setColor(0x3f704d)
      .setTitle(`Weather forecast for ${locationName}`)
      .setDescription(`Using the ${units} unit system`)
      .setTimestamp()
      .setFooter({
        text: "Powered by WeatherAPI.com",
      });
    for (const day of weatherData) {
      const temperatureMin = isMetric
        ? day.temperatureMinC
        : day.temperatureMinF;
      const temperatureMax = isMetric
        ? day.temperatureMaxC
        : day.temperatureMaxF;

      embed.addFields({
        name: day.date,
        value: `⬇️ Min: ${temperatureMin}°, ⬆️ Max: ${temperatureMax}°`,
      });
    }
    // passing an array because we can send multiple embeds
    await interaction.editReply({
      embeds: [embed],
    });
  } catch (error) {
    if (error instanceof Error) {
      await interaction.editReply({
        content: `An error occurred: ${error.message}`,
      });
    } else {
      await interaction.editReply({
        content: "An unknown error occurred.",
      });
    }
  }
}
