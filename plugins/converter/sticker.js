exports.run = {
   noxious: ['sticker'],
   hidden: ['s', 'sk', 'stiker', 'sgif'],
   use: 'query / reply media',
   category: 'converter',
   async: async (m, {
      clips,
      text,
      isPrefix,
      command
   }) => {
      try {
         let exif = global.db.setting
            if (m.quoted ? m.quoted.message : m.msg.viewOnce) {
               let type = m.quoted ? Object.keys(m.quoted.message)[0] : m.mtype
               let q = m.quoted ? m.quoted.message[type] : m.msg
               let img = await clips.downloadMediaMessage(q)
               clips.sendReact(m.chat, '🕒', m.key)
               if (/video/.test(type)) {
                  if (q.seconds > 10) return clips.reply(m.chat, Func.texted('bold', `🚩 Maximum video duration is 10 seconds.`), m)
                  clips.sendProgress(m.chat, status.wait, m)
                  return await clips.sendSticker(m.chat, img, m, {
                     packname: exif.sk_pack,
                     author: exif.sk_author
                  })
               } else if (/image/.test(type)) {
                  return await clips.sendSticker(m.chat, img, m, {
                     packname: exif.sk_pack,
                     author: exif.sk_author
                  })
               }
            } else {
               let q = m.quoted ? m.quoted : m
               let mime = (q.msg || q).mimetype || ''
               if (/image\/(jpe?g|png|webp)/.test(mime)) {
                  let img = await q.download()
                  clips.sendReact(m.chat, '🕒', m.key)
                  if (!img) return clips.reply(m.chat, global.status.wrong, m)
                  return await clips.sendSticker(m.chat, img, m, {
                     packname: exif.sk_pack,
                     author: exif.sk_author
                  })
               } else if (/video/.test(mime)) {
                  if ((q.msg || q).seconds > 10) return clips.reply(m.chat, Func.texted('bold', `🚩 Maximum video duration is 10 seconds.`), m)
                  let img = await q.download()
                  if (!img) return clips.reply(m.chat, global.status.wrong, m)
                  return await clips.sendSticker(m.chat, img, m, {
                     packname: exif.sk_pack,
                     author: exif.sk_author
                  })
               } else clips.reply(m.chat, Func.texted('bold', `🚩Reply Sticker / Gambar Dan Ketik ${isPrefix + command}`), m)
            }
      } catch (e) {
         console.log(e)
         return clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}