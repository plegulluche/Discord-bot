const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
    .setName("forecast")
    .setDescription("Replies with the weather forecast for a specific location")
    .addStringOption((option) => {
        return option
            .setName("location")
            .setDescription("The location can be a city, a zip/postal code, or a lat & long")
            .setRequired(true);
    })
    .addStringOption((option) => {
        return option
            .setName("units")
            .setDescription('The unit system of the results: either "metric" or "imperial"')
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
    })
    ;
