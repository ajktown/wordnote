# Wordnote

<!-- TOC -->

- [Wordnote](#wordnote)
  - [Overview](#overview)
  - [Public Image](#public-image)
  - [Depending Libraries](#depending-libraries)
    - [Luxon](#luxon)
  - [Package json scripts](#package-json-scripts)
    - [Upgrade all packages to the latest](#upgrade-all-packages-to-the-latest)
    - [Format into the standard format](#format-into-the-standard-format)
  - [About the starter of this project](#about-the-starter-of-this-project)
    - [Getting Started](#getting-started)
    - [Learn More](#learn-more)
    - [Deploy on Vercel](#deploy-on-vercel)

<!-- /TOC -->

## Overview

Wordnote is the second generation project produced by AJK Town, or AJ Kim. It was renamed after "Wordy".

https://wordnote.ajktown.com

## Public Image

https://hub.docker.com/r/ajktown/wordnote/tags


## Depending Libraries

### Luxon

We use Luxon for date and time management of this project.

## Package json scripts

### Upgrade all packages to the latest

Before you upgrade packages of this project
```bash
cat ./yarn-latest.log
# 230215, meaning `$ yarn latest` was run on Feb 15, 2023
```

### Format into the standard format

This function will fix lint for the repository. Run this every time before doing the PR. It won't pass the lint pipeline test (TODO: Not yet read, coming soon)
```bash
yarn inspect
```

You can upgrade all packages together by
```bash
yarn latest
```

## About the starter of this project

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Getting Started

First, run the development server:

```bash
yarn dev
# or
npm run dev
```

Open [http://localhost:3002](http://localhost:3002) with your browser to see the result.


### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.