import {Client,Events,GatewayIntentBits} from "discord.js"
import dotenv from "dotenv"
dotenv.config()

type clientType = {
  readyClient: Client<boolean>
}

const client = new Client({intents: [GatewayIntentBits.Guilds]})
client.once(Events.ClientReady,(readyClient)=>{
  console.log(`Logged in as ${readyClient.user.tag}`)
})

client.login(process.env.Discord_token)
