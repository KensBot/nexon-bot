exports.run = {
   noxious: ['setlink'],
   use: 'link',
   category: 'owner',
   async: async (m, {
      clips,
      text,
      isPrefix,
      command
   }) => {
      try {
         let setting = global.db.setting
         if (!text) return clips.reply(m.chat, Func.example(isPrefix, command, global.db.setting.link), m)
         const isUrl = Func.isUrl(text)
         if (!isUrl) return clips.reply(m.chat, Func.texted('bold', `URL is invalid.`), m)
         setting.link = text
         clips.reply(m.chat, Func.texted('bold', `Link Tautan berhasil di set.`), m)
      } catch (e) {
         clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   owner: true,
   cache: true,
   location: __filename
}