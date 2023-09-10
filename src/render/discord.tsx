import { Root, render } from '@urban-bot/core';
import { UrbanBotDiscord } from '@urban-bot/discord';
import dotenv from 'dotenv';
import { cleanEnv, num, str } from 'envalid';

import { App } from '../App';

dotenv.config();

const { DISCORD_TOKEN, PORT } = cleanEnv(process.env, {
    DISCORD_TOKEN: str({
        desc: 'Provide DISCORD_TOKEN to .env https://discord.com/developers/applications/PASTE_YOUR_ID/bot',
    }),
    PORT: num({ default: 8080 }),
});

if (!DISCORD_TOKEN) {
    throw new Error('Provide DISCORD_TOKEN to .env');
}

const urbanBotDiscord = new UrbanBotDiscord({
    token: DISCORD_TOKEN,
    intents: [
        'GUILDS',
        'GUILD_MESSAGES',
        'DIRECT_MESSAGES',
        'DIRECT_MESSAGE_REACTIONS',
    ],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

render(
    <Root bot={urbanBotDiscord} port={PORT}>
        <App />
    </Root>,
    () => {
        console.log('discord bot has started');
    },
);
