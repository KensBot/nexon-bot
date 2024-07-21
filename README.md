### Script v5.0.0

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


### Pairing Code

Connecting account without qr scan but using pairing code.

```Javascript
{
   "pairing": {
      "state": false, // "true" if you want to use the pairing code
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
