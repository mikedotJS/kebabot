import { Message, MessageEmbed } from "discord.js";

import { api, client } from "../../client";

export async function reactionRoles(message: Message): Promise<void> {
  if (!message.guild) return;

  const { data: rules } = await api.get(`/rules/${message.guild?.id}`);

  await Promise.all(
    rules.reactionRoles.map(async (reactionRolesRule) => {
      const embedMessage = new MessageEmbed().setDescription(
        reactionRolesRule.message
      );
      const reactionMessage = await message.channel.send(embedMessage);

      reactionRolesRule.reactionRoles.forEach((reactionRole) => {
        reactionMessage.react(
          String.fromCodePoint(Number(`0x${reactionRole.reaction_id}`))
        );

        client.on("messageReactionAdd", async (reaction, user) => {
          if (reaction.message.id === reactionMessage.id) {
            try {
              const guildMember = await message.guild?.members.fetch(user.id);

              if (guildMember) {
                const role = await message.guild?.roles.fetch(
                  reactionRole.role_discord_id
                );

                if (role && !guildMember.user.bot)
                  await guildMember.roles.add(role);
              }
            } catch (error) {
              console.error(error);
            }
          }
          return;
        });
      });
    })
  );
}
