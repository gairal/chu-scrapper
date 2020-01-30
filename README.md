# Chrapper - Chu Scrapper

---

> A lil Scrapper tool built with [TypeScript](https://www.typescriptlang.org/),
> [Firebase](https://firebase.google.com/), [Fastify](https://www.fastify.io/), [Cheerio](https://cheerio.js.org/),
> [Prettier](https://prettier.io/), [eslint](https://eslint.org/), and ❤️

## Motivations

Building a scrapper to centralize some events calendars

## Features

See the client side package here [chu-events](https://github.com/gairal/chu-events)

This package is a serverless backend built on top of Firebase Functions (gCloud Functions). It exposes 3 endpoints:

- GET /tweets => search for tweets
- POST /sheets => save tweets to a google sheet
- GET /translates => translate a string in English

The whole API is behind a google SSO authentication
