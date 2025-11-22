import { SlashCommandBuilder } from "discord.js";

export const server = {
  data: new SlashCommandBuilder().setName("server").setDescription("server info"),
  async execute(intrection:any){
    await intrection.reply(`Server name:${intrection.guild.name} Server Total members:${intrection.guild.memberCount}`)
  }
}
