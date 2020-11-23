# <div align="center"><p>sQuiz Core</p></div>

## Introduction

Todo 😴

## Run in local

In order to run the project in good conditions you need [docker](https://docs.docker.com/get-docker/), [docker compose](https://docs.docker.com/compose/install/) and [yarn](https://classic.yarnpkg.com/fr/)

Run in these commands at the root of the repository to start the project:

Only the first time you run the project:  
`./scripts/init`

Every time you want to run the project:  
`yarn start`

## Use Twitch Authentication in Dev

1. Create a Twitch app [here](https://dev.twitch.tv/console/apps/create)
   - Name (you can put what you want): sQuiz-dev
   - oAuth redirect URL: https://localhost:19006
   - Category: Website Integration
1. Copy the client ID and replace the `dev.twitchClientId` token in `packages/client/src/constants/index.ts` with yours
1. Copy the client ID, client secret and paste them into the backend .env file (`packages/backend/.env`)

## How to contribute

If you want to contribute to an issue, just create a fork, run the project in local, make your changes, commit your changes with the commitizen rules (use `git commit` or `yarn commit`), then you can create a pull request !
