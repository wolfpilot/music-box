# music-box

A small Spotify player built with React + Redux based on the now deprecated Facebook [create-react-app](https://github.com/facebook/create-react-app) tool.

> This project was **started in 2018** and has since been tweaked, cleaned up and brought back to life, but I will not be actively maintaining it.
>
> In other words, be curious, just don't expect too much.

## Table of contents

- [How it works](#how-it-works)
- [Features](#features)
- [Getting started](#getting-started)
  - [Requirements](#requirements)
  - [Spotify Setup Guide](#spotify-setup-guide)
  - [Installation](#installation)
  - [How to run](#how-to-run)
  - [How to deploy](#how-to-deploy)
- [Limitations](#limitations)
- [Changelog](#changelog)
- [Resources](#resources)

## How it works

The app is built on [create-react-app](https://github.com/facebook/create-react-app) (`react-scripts@2`), with Redux handling the state and `normalizr` flattening the Spotify responses.

- [`App`](src/components/App) wraps the router and the store.
- [`Stream`](src/components/Stream) renders the Homepage lists and the playlist, album and Liked Songs pages.
- [`Player`](src/components/Player) is the player bar at the bottom, driven by Spotify's Web Playback SDK.
- [`services`](src/services) holds the Redux state, split into `session`, `user`, `stream`, `entities` and `player`, plus the Spotify API wrappers.

### Auth flow

Logging in uses Spotify's Authorization Code flow with PKCE, in a popup. There is no backend: the token lives in the browser, and the user is logged out and sent back to the Homepage when it expires.

## Features

- Homepage shows saved playlists, albums and liked songs
- Play, pause, previous, next, shuffle, repeat (single track) and mute
- Seeking by clicking on the progress bar

## Getting started

### Requirements

- Node.js 16 (see `.nvmrc`)
- pnpm (built on v12.11.2)

### Spotify Setup Guide

Since the inception of this project when I was using Spotify's Web API to play free 30s track previews, a lot has changed.

Spotify's Web Playback SDK nowadays requires a **Premium** account. It will simply not work otherwise. Once you got that going, follow these steps:

1. Set up a [Spotify for Devevelopers](https://developer.spotify.com/) account.
2. Create an app and replace the `Client ID` in [.env](./.env.sample).
3. Add the your redirect URIs for _/authorize_ and _/callback_, e.g.:

   - https://wolfpilot-music-box.vercel.app/callback
   - https://wolfpilot-music-box.vercel.app/authorize
   - http://127.0.0.1:3000/authorize
   - http://127.0.0.1:3000/callback

   Note the `127.0.0.1` IP. Spotify no longer accepts `localhost`.

4. Set the enabled APIs to `Web API` and `Web Playback SDK`.

### Installation

```sh
# Install the dependencies
$ pnpm install

# Copy and customise your env variables
$ cp .env.sample .env.local
```

Then set `REACT_APP_SPOTIFY_CLIENT_ID` in `.env.local` to the Client ID of your Spotify app. The same variable is set in `.env.production` for the deployed build.

### How to run

```sh
$ pnpm start
```

Then go to http://127.0.0.1:3000.

### How to deploy

The app is a static build, and `vercel.json` rewrites every route to `index.html`.

```sh
$ pnpm build
```

When building with Node 17 or newer, set `NODE_OPTIONS=--openssl-legacy-provider` (it's already in `.env.production`), since webpack 4 needs the legacy OpenSSL provider.

## Limitations

Spotify has restricted its Web API for apps in development mode, which shapes what this player can show:

- Playlists made by Spotify can't be fetched.
- Only the app owner and up to 5 added users can log in.
- The featured playlists, new releases and track preview endpoints are gone, which is why the Homepage shows your own library and playback goes through the SDK.

## Changelog

Changes since the 2019 `feature/player` work (`d44ce30`):

- Migrated from `npm` to `pnpm`, pinned Node 16 and replaced `node-sass` with Dart Sass.
- Set up Prettier with a pre-commit hook and fixed the Sass deprecation warnings.
- Switched the login to the Authorization Code flow with PKCE and moved the dev server to `127.0.0.1`.
- Migrated playback to the Web Playback SDK, since tracks no longer have a `preview_url`.
- Replaced the removed Spotify endpoints with the user's saved playlists, albums and added Liked Songs.
- Split the Homepage into Liked Songs, Playlists and Albums.
- Added previous/next, shuffle, repeat, mute, seeking and play/pause on click.
- Refreshed the design: Inter font, Tabler icons, a dark player and a backdrop image on the playlist page.
- Log out and redirect to the Homepage on auth errors such as expired session.

## Resources

- [Spotify Web API](https://developer.spotify.com/documentation/web-api)
- [Spotify Web Playback SDK](https://developer.spotify.com/documentation/web-playback-sdk)
- [Authorization Code with PKCE](https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow)
