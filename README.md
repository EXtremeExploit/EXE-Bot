* Not updating anymore due to being forced to reapply again for privileged intents which takes like 2 months to get verified (again, although im already verified, so fuck you discord), and because discord loves to deprecate and change the rules of already working endpoints in their API, making bot developers change every single command to use x and not y, etc. discord moment
* i also dont like discord in itself, the developers dont give a fuck about the linux community or how bad the client is, made for gaming my balls, it takes like 30% CPU usage and about 1GiB of RAM, like BRUH come on its intended to have in the background while gaming so dont use more resources than the fucking game

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
6. Instal typescript npm module: `npm i typescript -g`. It will install globaly so if you've done this before you don't need this step
7. Compile: `tsc`. Run this command inside the folder that has the main files, like `.eslintrc`, `tsconfig.json`
8. `npm run start`; This will run latest compiled
