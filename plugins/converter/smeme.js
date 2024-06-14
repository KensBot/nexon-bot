exports.run = {
   noxious: ['smeme'],
   use: 'text | text',
   category: 'converter',
   async: async (m, {
      clips,
      text,
      isPrefix,
      command
   }) => {
      try {
         let exif = db.setting
         if (!text) return clips.reply(m.chat, Func.example(isPrefix, command, 'Hi | Dude'), m)
         clips.sendReact(m.chat, '🕒', m.key)
         let [top, bottom] = text.split`|`
         if (m.quoted ? m.quoted.message : m.msg.viewOnce) {
            let type = m.quoted ? Object.keys(m.quoted.message)[0] : m.mtype
            let q = m.quoted ? m.quoted.message[type] : m.msg
            if (/image/.test(type)) {
            clips.sendReact(m.chat, '🕒', m.key)
               let img = await clips.downloadMediaMessage(q)
               let json = await Scrape.uploadImage(img)
               let res = `https://api.memegen.link/images/custom/${encodeURIComponent(top ? top : ' ')}/${encodeURIComponent(bottom ? bottom : '')}.png?background=${json.data.url}`
               await clips.sendSticker(m.chat, res, m, {
                  packname: exif.sk_pack,
                  author: exif.sk_author
               })
            } else clips.reply(m.chat, Func.texted('bold', `🚩 Only for photo.`), m)
         } else {
         	clips.sendReact(m.chat, '🕒', m.key)
            let q = m.quoted ? m.quoted : m
            let mime = (q.msg || q).mimetype || ''
            if (!mime) return clips.reply(m.chat, Func.texted('bold', `🚩 Reply photo.`), m)
            if (!/image\/(jpe?g|png|webp)/.test(mime)) return clips.reply(m.chat, Func.texted('bold', `🚩 Only for photo.`), m)
            let img = await q.download()
            let json = await Scrape.uploadImage(img)
            let res = `https://api.memegen.link/images/custom/${encodeURIComponent(top ? top : ' ')}/${encodeURIComponent(bottom ? bottom : '')}.png?background=${json.data.url}`
            await clips.sendSticker(m.chat, res, m, {
               packname: exif.sk_pack,
               author: exif.sk_author
            })
         }
      } catch (e) {
         return clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}