import { Client, GatewayIntentBits } from 'discord.js';
import keys from '../keys';
import status from '../controllers';

const client = new Client({ 
    intents: [GatewayIntentBits.Guilds] 
});

client.login(keys.discordToken)
  .catch((err) => {
    console.error('[Login Error]', err)
    process.exit(1)
})

client.on('ready', () => {
    console.log("Login Sucessful!")

    status.updateStatus();
})