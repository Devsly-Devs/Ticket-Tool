# Ticket-Tool

This bot is made for those who wants to host a Ticket tool like bot without any limitations. You can customize to your needs (If you know how to code)
**Note - We built this bot by keeping mind of Spotify upgrade service.
In Future, we may add different versions / Releases to it.**

## Setup
* You need to have [Node js V12.0+](https://nodejs.org/en/) installed
* You need to have [mongoDB service](https://www.mongodb.com/try/download/community) to be installed
* To install dependencies, just write `npm install` , And it'll start installing all dependencies

**Now,** 
* Go to config.json file and update your `Bot-Token` 
* Update your `Db-URL`(If you use db as localhost then just write `mongodb+srv://localhost:27017`) 
* `DB-Name` You can give anything you want. but make sure the Db-Name matches with the DB you created in mongo.

## Start
* To start the bot, open the command prompt in the root directory. Then write, `node bot.js`
* After successfully started. Just run `$setup` Command to setup DB and Guild

## Features
It has all features from creating a ticket to transcript.

**Commands**
* $add - Adds a user to ticket
* $close - Closes the Ticket
* $config - A configuration menu where you have to add some data regarding your preference of Transcript channel and support Roles
* $delete - Deletes the ticket
* $help - A Help menu
* $panel - Creates a Panel ( Contains - General related , Kicked from plan , Paypal Related , Resell Related
* $reopen - Reopens a Ticket
* $setup - Prepares DB and Guild
* $transcript - Saves transcript to the channel which specified

## Conclusion
If you face any issue Feel free to contact me. Also, join our discord server. 
Soon, we'll try to do more open source projects From **Devsly Orgonization**

For any pull request, Please create a issue first and explain about it. Or Else, it'll be closed.

Thanks.

## Contact
Discord - `White2001#0530`
Telegram - `@WhiteGrim_Nulled`
Discord-Server - `https://discord.gg/thf94wrvdj`
