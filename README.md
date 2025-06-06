# Wordnote

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/ajktown/wordnote)
[![CII Best Practices](https://bestpractices.coreinfrastructure.org/projects/8244/badge)](https://bestpractices.coreinfrastructure.org/projects/8244)

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/mlajkim)


## Table of Contents

<!-- TOC -->

- [Wordnote](#wordnote)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [For Developers](#for-developers)
  - [Public Image](#public-image)
    - [Push image command locally](#push-image-command-locally)
  - [Depending Libraries](#depending-libraries)
    - [Luxon](#luxon)
  - [Package json scripts](#package-json-scripts)
    - [Upgrade all packages to the latest](#upgrade-all-packages-to-the-latest)
    - [Format into the standard format](#format-into-the-standard-format)
  - [About the starter of this project](#about-the-starter-of-this-project)
    - [Getting Started](#getting-started)
      - [Run api server](#run-api-server)
    - [Learn More](#learn-more)
    - [Deploy on Vercel](#deploy-on-vercel)

<!-- /TOC -->

## Overview

Wordnote is the second generation project produced by AJK Town, or AJ Kim. It was renamed after "Wordy".

https://wordnote.ajktown.com


## For Developers
- [Developer guide](https://github.com/ajktown/docs/tree/main/dev_wordnote)

## Public Image

https://hub.docker.com/r/ajktown/wordnote/tags


### Push image command locally
By default, the GitHub Action will build and push the image to the Docker Hub. If you want to push the image locally, you can use the following commands:
```sh

docker build -t ajktown/wordnote:latest .
docker push ajktown/wordnote:latest

```

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

This function will fix lint for the repository. Run this every time before doing the PR. It won't pass the lint pipeline test.
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

#### Run api server
The Wordnote application depends on the ajktown-api server.
Please install it first. https://github.com/ajktown/api.


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
