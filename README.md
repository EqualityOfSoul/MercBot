# Merc Bot

### Commands

- **stats:** Displays server / bot statistics
- **Ping:** Check if bot is online
- **Help:** Displays information about commands
- **Staff:** Displays server commanders
- **Scammer:** Checks SteamRep.com for reputation (!scammer <steamid>)
- **Steam:** Displays Steam information (!steam <user or steamid>)
- **Steamid:** Get steamid from a search (!steamid <name or url>)
- **Rocket:** Gets Rocket League Stats from steamid (!rocket <steamid>)
- **Rocketbanner:** Gets RocketLeagueStats.com banner from steamid (!rocketbanner <steamid>)
- **Lol:** Displays a lulzs text
- **Ryan** Displays Ryan
---
### Admin Commands
- **Kick**
- **Ban**
- **Purge**
- **Lockdown**
- **Mute**
- **Warn**
- **Unban**
 
 
### Development Guide

Obtain credentials from myself in order to run this bot locally. 
Or create your own settings.json with the following values:

- ownerid
- adminrolename
- modrolename
- STEAMAPIKEY
- ROCKETAPIKEY

To start the application:

```sh
$ yarn install
$ node app.js
```

Before any commits, please run
```npm test```. This will be ran as part of the production deployment pipeline
