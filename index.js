import { log } from 'console';
import { Client, Events, GatewayIntentBits, Collection } from 'discord.js';
import 'dotenv/config';
import path from 'node:path'
import fs from 'node:fs'
const token = process.env.TOKEN;

const client = new Client({intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
]});

client.commands = new Collection();

const loadCommands = async () => {
    const foldersPath = path.join('commands');
    const commandFolders = fs.readdirSync(foldersPath);

    for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const modulePath = pathToFileURL(filePath).href; // Convert to URL format
            const command = await import(modulePath); // Use the URL for import

            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command);
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }
};

client.on(Events.ClientReady, readyClient => {
    log(`O Bot ${client.user.displayName} foi iniciado`);
});

client.login(token);

