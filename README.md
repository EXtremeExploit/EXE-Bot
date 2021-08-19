# EXE-Bot

* [**Invite Link**](https://discordapp.com/oauth2/authorize?client_id=353661793199194112&permissions=8&scope=bot)

## Discord server
* Join the [discord server](https://discord.gg/sJPmDDn)!

## Commands & Info
* [Home](https://extremeexploit.github.io/EXE_Bot/Wiki/)
* [FAQ](https://extremeexploit.github.io/EXE_Bot/Wiki/FAQ)


## Running
1. Clone the repo
2. `cd EXE-Bot`
3. `npm install`
4. Open `json/config.json` and edit as your liking
5. Create a file in `json/` called `.env` and add the next:
```
tokenBeta=''
tokenRelease=''
useBeta='false'

osuKey=''

googleAppApiKey=''
googleCseID=''

dbUrl='mongodb+srv://<YOURUSERNAME>:<YOURPASSWORD>@<YOURHOST>/<YOURDB>?retryWrites=true'
```
5. Edit it with your desired configuration
    * If you don't plan on using a testing bot, leave tokenBeta blank and useBeta on `'false'`
6. `npm run starttsc`; This will compile and then run, if you want only to run latest compiled: `npm run startnotsc`