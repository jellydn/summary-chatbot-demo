<h1 align="center">Welcome to chatbot-starter-app 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <img src="https://img.shields.io/badge/node-%3E%3D16.20.0-blue.svg" />
  <a href="https://github.com/jellydn/chatbot-starter-app#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/jellydn/chatbot-starter-app/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/jellydn/chatbot-starter-app/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/jellydn/chatbot-starter-app" />
  </a>
</p>

> Develop chatbot with zero configuration using typescript

[![#Build with IT Man - ChatBot & AI - Part 1 [Vietnamese]](https://i.ytimg.com/vi/q1ngSbMqXUE/hqdefault.jpg)](https://www.youtube.com/watch?v=q1ngSbMqXUE)

## Prerequisites

-   node >=16.20.0

## Install

```sh
pnpm install
```

## Usage

```sh
git clone https://github.com/jellydn/chatbot-starter-app.git
```

Create .env from .env.example then run below command

```sh
pnpm dev
```

## Run tests

```sh
pnpm test
```

## How to setup

### Telegram

1.  Get telegram [token](https://core.telegram.org/bots#6-botfather)
2.  Paste token to `.env` `TELEGRAM_TOKEN=YOUR_TOKEN`
3.  Uncomment `// import './render/telegram';` inside `src/index.ts`
4.  Run `npm run dev` and check your bot

### Discord

1. Get discord [token](https://discord.com/developers/applications/PASTE_YOUR_ID/bot)
2. Paste token to `.env` `DISCORD_TOKEN=YOUR_TOKEN`
3. Uncomment `// import './render/discord';` inside `src/index.ts`
4. Run `npm run dev` and check your bot

### Slack

1.  Create [slack app](https://slack.com/intl/en-ru/help/articles/115005265703-Create-a-bot-for-your-workspace)
2.  Paste [token](https://api.slack.com/authentication/token-types#granular_bot) to `.env` `SLACK_TOKEN=YOUR_TOKEN`
3.  Paste [signing secret](https://api.slack.com/authentication/verifying-requests-from-slack#about) to `.env` `SLACK_SIGNING_SECRET=YOUR_SIGNING_SECRET`
4.  Run `npm run start-tunnel` and connect the public url with slack webhook.
5.  Uncomment `// import './render/slack';` inside `src/index.ts`
6.  Run `npm run dev` and check your bot

### Facebook

1. Create [facebook app](https://developers.facebook.com/docs/messenger-platform/getting-started/app-setup)
2. Paste credentials to `.env`
3. Run `npm run start-tunnel` and connect the public url with facebook webhook.
4. Uncomment `// import './render/facebook';` inside `src/index.ts`
5. Run `npm run dev` and check your bot

## Author

👤 **Dung Huynh**

-   Website: https://productsway.com/
-   Twitter: [@jellydn](https://twitter.com/jellydn)
-   Github: [@jellydn](https://github.com/jellydn)

## Show your support

Give a ⭐️ if this project helped you!
