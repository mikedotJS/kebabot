import { client } from './client';
import { commandRouter } from './components';
import { Command } from './components/command-router/command-router';
import { COMMAND_KEYWORD } from './constants';

client.on("ready", () => {
  console.log(`Logged in as ${client?.user?.tag}!`);
});

client.on("message", (message) => {
  if (message.author.bot) return;
  const [command, arg1] = message.content.split(" ");

  if (!command.startsWith(COMMAND_KEYWORD)) return;
  commandRouter(arg1 as Command, message);
});
