exports.run = {
   noxious: ['take'],
   hidden: ['wm'],
   use: 'packname | author',
   category: 'converter',
   async: async (m, {
      clips,
      text,
      isPrefix
   }) => {
      try {
         if (!text) return clips.reply(m.chat, Func.texted('bold', `🚩 Give a text to make watermark.`), m)
         let [packname, ...author] = text.split`|`
         author = (author || []).join`|`
         let q = m.quoted ? m.quoted : m
         let mime = (q.msg || q).mimetype || ''
         if (!/webp/.test(mime)) return clips.reply(m.chat, Func.texted('bold', `🚩 Reply to the sticker you want to change the watermark.`), m)
         let img = await q.download()
         if (!img) return clips.reply(m.chat, global.status.wrong, m)
         clips.sendSticker(m.chat, img, m, {
            packname: packname || '',
            author: author || ''
         })
      } catch (e) {
         console.log(e)
         return clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   premium: true,
   limit: true,
   cache: true,
   location: __filename
}