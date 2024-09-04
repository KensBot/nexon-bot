exports.run = {
   noxious: ['emojimix'],
   hidden: ['mix', 'emonix'],
   category: 'converter',
   async: async (m, {
      clips,
      text,
      isPrefix,
      command
   }) => {
      try {
         let exif = global.db.setting
         if (!text) return clips.reply(m.chat, Func.example(isPrefix, command, '🐦+😎'), m)
         let [emo1, emo2] = text.split`+`
         clips.sendReact(m.chat, '🕒', m.key)
         if (!emo1 || !emo2) return clips.reply(m.chat, Func.texted('bold', `Berikan 2 emoticon untuk di mix`), m)
         let json = await Api.nexon('/emojimix', {
                      emoji_1: emo1,
                      emoji_2: emo2
                    })
         if (!json.status) return clips.reply(m.chat, Func.texted('bold', `Emoticon tidak bisa di mix.`), m)
         await clips.sendSticker(m.chat, await Func.fetchBuffer(json.data.url), m, {
            pack: exif.sk_pack,
            author: exif.sk_author
         })
      } catch (e) {
         return clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}