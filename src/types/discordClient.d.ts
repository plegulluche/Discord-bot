import "discord.js";
import { Collection, CommandInteraction } from "discord.js";

// We are extending the `Client` class from the discord.js library to add a custom property `commands`.
// By default, discord.js doesn't include a `commands` property in the Client class.
// In our bot, we are using this property to store the commands available for the bot.
// So, to make TypeScript aware of this additional property, we extend the Client interface to include it.

// `Collection` is a discord.js class that behaves like a Map, which allows us to store the commands by their name and their corresponding command data or handler.

// The `declare module` syntax is used to "augment" the types inside the discord.js module.
// This is a way to tell TypeScript that we're adding something new to an existing module.

declare module "discord.js" {
  export interface Client {
    // We add a `commands` property to the Client instance.
    // It is a Collection where the key is the command's name (a string),
    // and the value is any type (this could be further refined depending on how you structure your commands).
    commands: Collection<string, { data: { name: string }, execute: (interaction: CommandInteraction) => Promise<void> }>;
  }
}
