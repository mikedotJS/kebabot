import Discord from 'discord.js';
import * as dotenv from 'dotenv';

dotenv.config();

const client = new Discord.Client();

client.login(process.env.DISCORD_BOT_TOKEN);

client.on("ready", () => {
  console.log(`Logged in as ${client?.user?.tag}!`);
});
