import { SlashCommandBuilder } from "discord.js";

export const greetSlash = {
  data: new SlashCommandBuilder()
    .setName("greet")
    .setDescription("replies a greet msg"),
  async execute(intrection:any){
    await intrection.reply(`hola dear user${intrection.user.username}`)
  }
};
