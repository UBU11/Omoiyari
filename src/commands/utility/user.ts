import { SlashCommandBuilder } from "discord.js";

export const user = {
  data: new SlashCommandBuilder().setName("user").setDescription("user info"),
  async execute(intrection:any){
    await intrection.reply(`User:${intrection.user.username} who joined on ${intrection.member.joinedAt}`)
  }
}
