import { Message, MessageEmbed } from 'discord.js';

import { client } from '../../client';

const mockedUser = {
  id: "1",
  params: {
    reactionRoles: {
      message: "Choisissez vos rôles !",
      reactions: [{ value: "%F0%9F%92%A9", role: "Valoleurs" }],
    },
  },
};
export async function reactionRoles(message: Message): Promise<void> {
  const { reactionRoles } = mockedUser.params;
  const embed = new MessageEmbed().setDescription(
    `${reactionRoles.message}: ${reactionRoles.reactions[0].role}`
  );

  const reactionMessage = await message.channel.send(embed);

  await reactionMessage.react(reactionRoles.reactions[0].value);

  client.on("messageReactionAdd", async (reaction, user) => {
    if (reaction.message.id === reactionMessage.id) {
      try {
        const guildMember = await message.guild?.members.fetch(user.id);

        if (guildMember) {
          const role = await message.guild?.roles.fetch("847484300508659712");
          if (role) await guildMember.roles.add(role);
        }
      } catch (error) {
        console.log(error);
      }
    }
    return;
  });
}
