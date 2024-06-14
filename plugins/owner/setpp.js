exports.run = {
   noxious: ['setpp'],
   use: 'reply photo',
   category: 'owner',
   async: async (m, {
      clips
   }) => {
      try {
     	let q = m.quoted ? m.quoted : m
         let mime = ((m.quoted ? m.quoted : m.msg).mimetype || '')
         if (/image\/(jpe?g|png)/.test(mime)) {
            clips.sendReact(m.chat, '🕒', m.key)
            const buffer = await q.download()
            const json = await Scrape.uploadImageV2(buffer)
            if (!json.status) return m.reply(Func.jsonFormat(json))
            await clips.updateProfilePicture(clips.user.id, {
               url: json.data.url
            })
            await Func.delay(3000).then(() => clips.reply(m.chat, Func.texted('bold', `Foto profil berhasil diubah.`), m))
         } else return clips.reply(m.chat, Func.texted('bold', `Reply ke foto yang akan dijadikan foto profil bot.`), m)
      } catch (e) {
         clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   owner: true,
   cache: true,
   location: __filename
}