exports.run = {
   noxious: ['setcover'],
   use: 'reply foto',
   category: 'owner',
   async: async (m, {
      clips
   }) => {
      let setting = global.db.setting
      try {
         let q = m.quoted ? m.quoted : m
         let mime = (q.msg || q).mimetype || ''
         if (!/image/.test(mime)) return clips.reply(m.chat, Func.texted('bold', `Gambar tidak ditemukan.`), m)
         clips.sendReact(m.chat, '🕒', m.key)
         let img = await q.download()
         if (!img) return clips.reply(m.chat, global.status.wrong, m)
         let link = await Scrape.uploadImageV3(img)
         if (!link.status) return m.reply(Func.jsonFormat(link))
         setting.cover = link.data.url
         clips.reply(m.chat, Func.texted('bold', `Cover berhasil di set.`), m)
      } catch (e) {
         return clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   owner: true,
   cache: true,
   location: __filename
}
