import { Message } from 'discord.js';

import { reactionRoles } from '../reaction-roles';

export enum Command {
  REACTION_ROLES = "reactionroles",
}

export function commandRouter(command: Command, message: Message): void {
  switch (command) {
    case Command.REACTION_ROLES:
      reactionRoles(message);
      break;
    default:
      return;
  }
}
