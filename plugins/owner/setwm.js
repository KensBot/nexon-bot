exports.run = {
   noxious: ['setwm'],
   use: 'packname | author',
   category: 'owner',
   async: async (m, {
      clips,
      text,
      isPrefix,
      command
   }) => {
      try {
         let setting = global.db.setting
         if (!text) return clips.reply(m.chat, Func.example(isPrefix, command, 'Sticker by | @kens'), m)
         let [packname, ...author] = text.split`|`
         author = (author || []).join`|`
         setting.sk_pack = packname || ''
         setting.sk_author = author || ''
         clips.reply(m.chat, Func.texted('bold', `Watermark Stiker berhasil disetel.`), m)
      } catch (e) {
         clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   owner: true,
   cache: true,
   location: __filename
}