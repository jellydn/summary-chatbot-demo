import { Root, render } from '@urban-bot/core';
import { UrbanBotFacebook } from '@urban-bot/facebook';
import dotenv from 'dotenv';
import { cleanEnv, num, str } from 'envalid';

import { App } from '../App';
import { logger } from '../logger';

dotenv.config();

const {
    FACEBOOK_APP_SECRET,
    FACEBOOK_PAGE_ACCESS_TOKEN,
    FACEBOOK_VERIFY_TOKEN,
    PORT,
} = cleanEnv(process.env, {
    FACEBOOK_APP_SECRET: str({
        desc: 'Provide FACEBOOK_APP_SECRET to .env https://developers.facebook.com/apps/<YOUR_APP_ID>/settings/basic/',
    }),
    FACEBOOK_PAGE_ACCESS_TOKEN: str({
        desc: 'Provide FACEBOOK_PAGE_ACCESS_TOKEN to .env "Messenger -> Settings -> Access Tokens" https://developers.facebook.com/apps/<YOUR_APP_ID>/messenger/settings/',
    }),
    FACEBOOK_VERIFY_TOKEN: str({
        desc: 'Provide FACEBOOK_VERIFY_TOKEN to .env. It is a random string, you can invent it yourself. After starting your bot provide it to "Messenger -> Settings -> Webhooks" https://developers.facebook.com/apps/<YOUR_APP_ID>/messenger/settings/',
    }),
    PORT: num({ default: 8080 }),
});

const urbanBotFacebook = new UrbanBotFacebook({
    appSecret: FACEBOOK_APP_SECRET,
    pageAccessToken: FACEBOOK_PAGE_ACCESS_TOKEN,
    verifyToken: FACEBOOK_VERIFY_TOKEN,
});

render(
    <Root
        isNewMessageEveryRender
        bot={urbanBotFacebook}
        port={PORT ? Number(PORT) : undefined}
    >
        <App />
    </Root>,
    () => {
        logger.info('facebook bot has started');
    },
);
