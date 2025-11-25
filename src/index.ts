import {
  Client,
  Events,
  GatewayIntentBits,
  MessageFlags,
  Collection,
} from "discord.js";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();



const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.once(Events.ClientReady, (readyClient) => {
  console.log(`Logged in as ${readyClient.user.tag}`);
});

client.commands = new Collection(); //TS property type eror

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folders of commandFolders) {
  const commandsPath = path.join(foldersPath, folders);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((files) => files.endsWith(".ts"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = import(filePath);
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `Warning ths command at ${filePath} is missing a required data or exectued property`
      );
    }
  }
}

client.on(Events.InteractionCreate, async (intrection: any) => {
  if (!intrection.isChatInputCommand()) return null;
  const command = intrection.client.commands.get(intrection.commandName);
  if (!command) {
    console.error(`no command matching ${intrection.commandName} was found`);
    return;
  }
  try {
    await command.execute(intrection);
  } catch (error) {
    console.error(`error message: ${error}`);
    if (intrection.replied || intrection.deffered) {
      await intrection.followUp({
        content: `there was an error while executing this command`,
        flags: MessageFlags.Ephemeral,
      });
    } else {
      await intrection.reply({
        content: "There was an error while executing this command!",
        flags: MessageFlags.Ephemeral,
      });
    }
  }
});

client.login(process.env.Discord_token);
