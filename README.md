### Premium Script v5.0.0

🚩  Price : *Rp. 200.000*

**Special Featuresb:**

-  AI & AI Image (No Apikey) 
-  Chat GPT (Turbo 3.5)
-  Anti Bot
-  Auto Download
-  Porn Detector (Image Recognize)
-  36 Mini Games
-  Rpg Games
-  Leveling & Roles
-  Email Verification
-  Send Email
-  No Encrpyt
-  Full Scraper (No Apikey)
-  High Optimation
-  Free Updates
-  No Encryption
-  No Apikey (Full Scraper)


**Creator / Group** : [Kens Ransyah](https://wa.me/628888375863) / [Nexon Bot](https://chat.whatsapp.com/)

### Requirement :

- [x] NodeJS >= v14 - v20
- [x] FFMPEG
- [x] Server vCPU/RAM 1/2GB (Min)

### Configuration

There are 2 configuration files namely ```env.json``` && ```config.js```, adjust them before installing.

```Javascript
{
   "owner": "628888375863",
   "name_owner": "Kens Ransyah",
   "database": "database",
   "ram_usage": "900mb",
   "max_upload_free": "100",
   "max_upload": "250",
   "limit": 25,
   "cooldown": 3, // anti spam hold 3 seconds
   "multiplier": 36,
   "timer": 1800000,
   "blocks": ["994", "91", "92"],
   "evaluate_chars": ["=>", "~>", "<", ">", "$"],
   "pairing": {
      "state": true, // "true" if you want to use the pairing code
      "number": 62xxxx // start number with country code
   },
   "replit": {
     "_url": ""
   },
   "api_key": {
     "mongoDB": "", // Database : https://www.mongodb.com/
   }
}
```


```Javascript
// Timezone (Default : Asia/Jakarta)
global.timezone = 'Asia/Jakarta'
// Bot name
global.botname = `© nexon-bot`
// Footer text
global.footer = 'ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴍᴀᴅᴇ ʙʏ ɴᴇxᴏɴ ッ'
// Function Scraper
global.Scrape = Scraper
// Function
global.Func = Function
// Global status
global.status = Object.freeze({
   wait: Func.texted('bold', 'Processed . . .'),
   invalid: Func.texted('bold', 'URL is Invalid!'),
   wrong: Func.texted('bold', 'Wrong format!'),
   getdata: Func.texted('bold', 'Scraping metadata . . .'),
   fail: Func.texted('bold', 'Can\'t get metadata!'),
   error: Func.texted('bold', 'Error occurred!'),
   errorF: Func.texted('bold', 'Sorry this feature is in error.'),
   auth: Func.texted('bold', 'You do not have permission to use this feature, ask the owner first.'),
   premium: Func.texted('bold', 'This feature only for premium user.'),
   owner: Func.texted('bold', 'This command only for owner.'),
   god: Func.texted('bold', 'This command only for Master'),
   group: Func.texted('bold', 'This command will only work in groups.'),
   botAdmin: Func.texted('bold', 'This command will work when I become an admin.'),
   admin: Func.texted('bold', 'This command only for group admin.'),
   private: Func.texted('bold', 'Use this command in private chat.'),
   gameSystem: Func.texted('bold', 'Game features have been disabled.'),
   nsfwInGroup: Func.texted('bold', 'The nsfw feature has not been activated.'),
   gameInGroup: Func.texted('bold', 'Game features have not been activated for this group.'),
   gameLevel: Func.texted('bold', 'You cannot play the game because your level has reached the maximum limit.')
})
```


**Notes** :
+ ```ram_usage``` : ram usage limit, for example you have a server with 1gb of ram set before the maximum capacity is 900mb.

+ ```mongoDB``` : can be filled with mongo and postgresql URLs to use localdb just leave it blank and the data will be saved to the .json file.

> Localdb is only for development state, for production state you must use a cloud database (mongo / postgres)



### Pairing Code

Connecting account without qr scan but using pairing code.

<p align="center"><img align="center" width="100%" src="https://telegra.ph/file/ae37cb69b0cc770f66d4b.jpg" /></p>

```Javascript
{
   "pairing": {
      "state": true, // "true" if you want to use the pairing code
      "number": 62xxxx // start number with country code
   }
}
```

### Installation & Run

Make sure the configuration and server meet the requirements so that there are no problems during installation or when this bot is running, type this on your console :

```
$ yarn or npm i
$ node .
```

or want to use pm2

```
$ yarn or npm i
$ npm i -g pm2
$ pm2 start index.js && pm2 save && pm2 logs
```

### Command Plugin

**Command Plugin** is a plugin that will run using the command.

```Javascript
exports.run = {
   noxious: ['play'],
   hidden: ['music'],
   use: 'query',
   category: 'downloader',
   async: async (m, {
      clips,
      args,
      text,
      isPrefix,
      command
   }) => {
      try {
         // do something
      } catch (e) {
         console.log(e)
         clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   limit: true,
   restrict: true,
   cache: true,
   location: __filename
}
```

#### Up Side Options :

+ ```noxious``` : main command that will automatically appear in the menu list, use of usage can be in the form of arrays and strings.

+ ```hidden``` : commands that are hidden from the menu list, suitable for command aliases or hidden features.

+ ```use``` : this parameter is optionally used when the plugin / feature requires input such as link, query, amount, etc.

+ ```category``` : categories for each plugin that the command will be arranged by category when the menu is displayed.

+ ```m``` : parameters that contain chat object.

+ ```clips``` : parameter which contains several messaging functions from [nexonprime](https://www.npmjs.com/package/nexonprime) and default functions from [Baileys](https://github.com/WhiskeySockets/Baileys).

+ ```args``` : nput given after command in the form of an array is usually found in downloader feature which uses links such as ig, youtube, fb, etc. Parsing based on index. (Example: args[1], args[2], args[3], ....)

+ ```text``` : input that is given after command in the form of a string is usually found in search features that use queries/keywords such as lyrics, chords, yts, etc.

+ ```isPrefix``` : prefix used, if noprefix mode is active this parameter will be blank (it's no problem).

+ ```command``` : commands used can be used in an if else or switch case conditional when creating 1 plugin with several commands in it.

+ ```env``` : parameters that contain the configuration from the env.json file.

+ ```Scrape``` : parameter containing some of the scraper functions of [nexonprime](https://www.npmjs.com/package/nexonprime) module.

+ ```Func``` : parameter containing some of the utilites functions of [nexonprime](https://www.npmjs.com/package/nexonprime) module.

#### Down Side Options

+ ```error``` : not very useful :v

+ ```limit``` : limit the use of features with limits, to set the number of limits give integer data and for default is boolean true for 1.

+ ```premium``` : to create special features for premium users.

+ ```restrict``` : limit input, restricted input is in the form of badwords in db.setting.toxic.

+ ```cache``` : option to auto update when done recode.

+ ```__filename``` : file path for auto update

**Other** :
```
cmd.async(m, { clips, args, text, isPrefix: prefix, prefixes, command, groupMetadata, participants, users, chats, groupSet, setting, isOwner, isAdmin, isBotAdmin, plugins, blockList })
```

### Event Plugin

```Javascript
exports.run = {
   async: async (m, {
      clips,
      body,
      prefixes
   }) => {
      try {
         // do something
      } catch (e) {
         return clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   cache: true,
   location: __filename
}
```

+ ```body``` : chat in the form of text or emoticons, this plugin is usually used for auto response or group protectors such as anti-links, anti-toxic etc.

+ ```prefixes``` : parameter which contains all prefixes in the form of an array, to use them parse based on index. (Example: prefixes[0]).

**Other** :
```
event.async(m, { clips, body, prefixes, groupMetadata, participants, users, chats, groupSet, setting, isOwner, isAdmin, isBotAdmin, plugins, blockList })
```
