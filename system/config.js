const { Function: Func, NexonApi } = new(require('nexonwb'))
global.Api = new NexonApi(process.env.API_ENDPOINT, process.env.API_KEY)
global.header = `© nexon-bot v${require('package.json').version} (Beta)`
global.footer = `ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴍᴀᴅᴇ ʙʏ ɴᴇxᴏɴ ッ`
global.status = Object.freeze({
   invalid: '_Invalid url_',
   wrong: '_Wrong format._',
   fail: '_Can\'t get metadata_',
   error: '_Error occurred_',
   errorF: '_Sorry this feature is in error._',
   premium: '❌ _This feature only for premium user._',
   auth: '⚠️ _You do not have permission to use this feature, ask the owner first._',
   owner: '⚠️ _This command only for owner._',
   group: '⚠️ _This command will only work in groups._',
   botAdmin: '⚠️ _This command will work when I become an admin._',
   admin: '⚠️ _This command only for group admin._',
   private: '❌ _Use this command in private chat._',
   gameSystem: '⚠️ _Game features have been disabled._',
   gameInGroup: '⚠️ _Game features have not been activated for this group._',
   gameLevel: '⚠️ _You cannot play the game because your level has reached the maximum limit._'
})