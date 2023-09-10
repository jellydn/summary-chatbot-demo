import { Root, render } from '@urban-bot/core';
import { UrbanBotTelegram } from '@urban-bot/telegram';
import dotenv from 'dotenv';
import { cleanEnv, num, str } from 'envalid';

import { App } from '../App';
import { logger } from '../logger';

dotenv.config();

const { TELEGRAM_TOKEN, PORT, NODE_ENV } = cleanEnv(process.env, {
    TELEGRAM_TOKEN: str({
        desc: 'Provide TELEGRAM_TOKEN to .env https://core.telegram.org/bots#6-botfather',
        example: '123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11',
    }),
    PORT: num({ default: 8080 }),
    NODE_ENV: str({
        choices: ['development', 'test', 'production'],
        default: 'development',
    }),
});

const isDevelopment = NODE_ENV === 'development';

const urbanBotTelegram = new UrbanBotTelegram({
    token: TELEGRAM_TOKEN,
    isPolling: isDevelopment,
});

render(
    <Root bot={urbanBotTelegram} port={PORT}>
        <App />
    </Root>,
    () => {
        logger.info('telegram bot has started at port ' + PORT);
    },
);
