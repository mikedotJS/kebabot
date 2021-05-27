import Discord from 'discord.js';
import * as dotenv from 'dotenv';

dotenv.config();

export const client = new Discord.Client();

client.login(process.env.DISCORD_BOT_TOKEN);
