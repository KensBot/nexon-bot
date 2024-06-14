exports.run = {
   noxious: ['setpic'],
   use: 'reply image',
   category: 'admin',
   async: async (m, {
      clips
   }) => {
      try {
         let q = m.quoted ? m.quoted : m
         let mime = ((m.quoted ? m.quoted : m.msg).mimetype || '')
         if (/image\/(jpe?g|png)/.test(mime)) {
            clips.sendReact(m.chat, '🕒', m.key)
            const buffer = await q.download()
            const json = await Scrape.uploadImageV3(buffer)
            if (!json.status) return m.reply(Func.jsonFormat(json))
            await clips.updateProfilePicture(m.chat, {
               url: json.data.url
            })
            await Func.delay(3000).then(() => clips.reply(m.chat, Func.texted('bold', `🚩 Gruop photo has been successfully changed.`), m))
         } else return clips.reply(m.chat, Func.texted('bold', `🚩 Reply to the photo that will be made into the bot's profile photo.`), m)
      } catch (e) {
         console.log(e)
         return clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   group: true,
   admin: true,
   botAdmin: true
}
