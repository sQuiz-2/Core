# <div align="center"><p>sQuiz Core</p></div>

## Introduction

Todo 😴

## Run in local

In order to run the project in good conditions you need [docker](https://docs.docker.com/get-docker/), [docker compose](https://docs.docker.com/compose/install/) and [yarn](https://classic.yarnpkg.com/fr/)

Run in these commands at the root of the repository to start the project:

Only the first time you run the project:  
`yarn`   
`docker-compose up -d`  
`cp ./packages/api/.env.example ./packages/api/.env`  
`cp ./packages/server/.env.example ./packages/server/.env`  
`yarn api cmd build`  
`yarn api cmd migration:run`  
`yarn api cmd db:seed`  
`yarn start`

Every time you want to run the project:  
`yarn start`

## How to contribute

If you want to contribute to an issue, just create a fork, run the project in local, make your changes, commit your changes with the commitizen rules (use `git commit` or `yarn commit`), then you can create a pull request !
