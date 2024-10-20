import { log } from 'console'
import { Client, Events, GatewayIntentBits } from 'discord.js'
import 'dotenv/config'
const token = process.env.TOKEN

const client = new Client({intents: [GatewayIntentBits.Guilds]})

client.on(Events.ClientReady, readyClient => {
    log(`O Bot ${client.user.displayName} foi iniciado`)
})

client.login(token)

