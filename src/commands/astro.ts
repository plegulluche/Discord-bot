import {
  SlashCommandBuilder,
  EmbedBuilder,
  CommandInteraction,
} from "discord.js";
import { fetchForecast } from "../requests/forecast";

export const data = new SlashCommandBuilder()
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

export async function execute(interaction: CommandInteraction): Promise<void> {
  // Trigger an ephemeral message saying that the bot is thinking ...
  // This is useful for long running commands
  // Act as initial response to confirm to discord taht we did receive the interaction
  // We have 15 minutes to respond to the interaction
  await interaction.deferReply();

  const location = interaction.options.get("location")?.value as string;

  try {
    const { weatherData, locationName }: any = await fetchForecast(location);

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
