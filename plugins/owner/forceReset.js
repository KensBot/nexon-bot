exports.run = {
   noxious: ['reset'],
   category: 'owner',
   async: async (m, {
      clips,
      args,
      command,
      setting
   }) => {
      try {
         global.db.users.filter(v => v.limit < global.limit && !v.premium).map(v => v.limit = args[0] ? args[0] : global.limit)
         setting.lastReset = new Date * 1
         clips.reply(m.chat, Func.texted('bold', `🚩 Successfully reset limit for user free to default.`), m)
      } catch (e) {
         return clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   owner: true,
   cache: true,
   location: __filename
}