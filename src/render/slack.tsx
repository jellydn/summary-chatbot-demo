import { Root, render } from '@urban-bot/core';
import { UrbanBotSlack } from '@urban-bot/slack';
import dotenv from 'dotenv';
import { cleanEnv, num, str } from 'envalid';

import { App } from '../App';
import { logger } from '../logger';

dotenv.config();

const { SLACK_SIGNING_SECRET, SLACK_TOKEN, PORT } = cleanEnv(process.env, {
    SLACK_SIGNING_SECRET: str({
        desc: 'Provide SLACK_SIGNING_SECRET to .env https://api.slack.com/authentication/verifying-requests-from-slack#about',
    }),
    SLACK_TOKEN: str({
        desc: 'Provide SLACK_TOKEN to .env https://api.slack.com/authentication/token-types#granular_bot',
    }),
    PORT: num({ default: 8080 }),
});

const urbanBotSlack = new UrbanBotSlack({
    signingSecret: SLACK_SIGNING_SECRET,
    token: SLACK_TOKEN,
});

render(
    <Root bot={urbanBotSlack} port={PORT}>
        <App />
    </Root>,
    () => {
        logger.info('slack bot has started');
    },
);
