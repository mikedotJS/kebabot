import Discord from 'discord.js';

describe("App", () => {
  test("Client should be defined", () => {
    const client = new Discord.Client();

    expect(client).toBeDefined();
  });
});
