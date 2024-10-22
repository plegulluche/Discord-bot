# Discord Weather Bot

This discord bot started as a learning project and i decided to improve it after my gaming mates asked me to add more features.
So now i use this project to improve my mates quality of life and improve my skills on tests , devops and backend developement on Typescript.

![GitHub last commit](https://img.shields.io/github/last-commit/plegulluche/discord-bot)

## Features

- Provides weather forecasts for specified cities
- Displays astronomical information
- Supports different metric systems
- Easy-to-use Discord commands

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/discord-weather-bot.git
   ```

2. Navigate to the project directory:
   ```
   cd discord-weather-bot
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your Discord bot token and any other required API keys:
   ```
   DISCORD_BOT_TOKEN=your_bot_token_here
   WEATHER_API_KEY=your_weather_api_key_here
   ```

## Usage

To start the bot in development mode:

```
npm run dev
```

To start the bot in production mode:

```
npm start
```

## Commands

- /forecast {city name/ lat,lng / zipcode} {metric} : display forecast for 5 days for input city with input metric system

- /astro {city} : display astro informations for input city for 5 days (moonrise , monnset , sunrise, sunset)

- /ping : respond with pong ! 

## Technologies Used

- Node.js
- discord.js
- axios
- dotenv
- jest

## TODOs

- ~~Use TypeScript~~
- Continue the developement using TDD with jest.(ongoing).
- Add documentation( ongoing) .
- Integrate game calendar feature
- Include WhatsApp notifications when a friend wants to play a game while the buddy is offline (ongoing)
- Deploy
- Scaling



## License

This project is licensed under the ISC License.

## Last Updated

This project was last updated on: [22/10/2024]