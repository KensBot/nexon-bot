exports.run = {
   noxious: ['tourl', 'tourlv2', 'tourlv3'],
   use: 'reply photo',
   category: 'converter',
   async: async (m, {
      clips,
      isPrefix,
      command
   }) => {
      try {
         if (command == 'tourlv2') {
         if (m.quoted ? m.quoted.message : m.msg.viewOnce) {
            let type = m.quoted ? Object.keys(m.quoted.message)[0] : m.mtype
            let q = m.quoted ? m.quoted.message[type] : m.msg
            let img = await clips.downloadMediaMessage(q)
            if (!/image/.test(type)) return clips.reply(m.chat, Func.texted('bold', `🚩 Give a caption or reply to the photo with the ${isPrefix + command} command`), m)
            clips.sendReact(m.chat, '🕒', m.key)
            const json = await Scrape.uploadImage(img)
            clips.reply(m.chat, json.data.url, m)
         } else {
            let q = m.quoted ? m.quoted : m
            let mime = (q.msg || q).mimetype || ''
            if (!/image\/(jpe?g|png)/.test(mime)) return clips.reply(m.chat, Func.texted('bold', `🚩 Give a caption or reply to the photo with the ${isPrefix + command} command`), m)
            let img = await q.download()
            if (!img) return clips.reply(m.chat, Func.texted('bold', `🚩 Give a caption or reply to the photo with the ${isPrefix + command} command`), m)
            clips.sendReact(m.chat, '🕒', m.key)
            const json = await Scrape.uploadImage(img)
            clips.reply(m.chat, json.data.url, m)
         }
           
      } else if (command == 'tourl') {
         if (m.quoted ? m.quoted.message : m.msg.viewOnce) {
            let type = m.quoted ? Object.keys(m.quoted.message)[0] : m.mtype
            let q = m.quoted ? m.quoted.message[type] : m.msg
            let img = await clips.downloadMediaMessage(q)
            if (!/image\/(png|jpe?g|gif)|video\/mp4/.test(mime)) return clips.reply(m.chat, Func.texted('bold', `🚩 Give a caption or reply to the photo with the ${isPrefix + command} command`), m)
            clips.sendReact(m.chat, '🕒', m.key)
            const json = await Scrape.uploadImageCdn(img)
            clips.reply(m.chat, json.data.url, m)
         } else {
            let q = m.quoted ? m.quoted : m
            let mime = (q.msg || q).mimetype || ''
            if (!/image\/(png|jpe?g|gif)|video\/mp4/.test(mime)) return clips.reply(m.chat, Func.texted('bold', `🚩 Give a caption or reply to the photo with the ${isPrefix + command} command`), m)
            let img = await q.download()
            if (!img) return clips.reply(m.chat, Func.texted('bold', `🚩 Give a caption or reply to the photo with the ${isPrefix + command} command`), m)
            clips.sendReact(m.chat, '🕒', m.key)
            const json = await Scrape.uploadImageCdn(img)
            clips.reply(m.chat, json.data.url, m)
         }
     } else if (command == 'tourlv3') {
         if (m.quoted ? m.quoted.message : m.msg.viewOnce) {
            let type = m.quoted ? Object.keys(m.quoted.message)[0] : m.mtype
            let q = m.quoted ? m.quoted.message[type] : m.msg
            let img = await clips.downloadMediaMessage(q)
            if (!/image\/(png|jpe?g|gif)|video\/mp4/.test(mime)) return clips.reply(m.chat, Func.texted('bold', `🚩 Give a caption or reply to the photo with the ${isPrefix + command} command`), m)
            clips.sendReact(m.chat, '🕒', m.key)
            const json = await Scrape.uploadImageV3(img)
            clips.reply(m.chat, json.data.url, m)
         } else {
            let q = m.quoted ? m.quoted : m
            let mime = (q.msg || q).mimetype || ''
            if (!/image\/(png|jpe?g|gif)|video\/mp4/.test(mime)) return clips.reply(m.chat, Func.texted('bold', `🚩 Give a caption or reply to the photo with the ${isPrefix + command} command`), m)
            let img = await q.download()
            if (!img) return clips.reply(m.chat, Func.texted('bold', `🚩 Give a caption or reply to the photo with the ${isPrefix + command} command`), m)
            clips.sendReact(m.chat, '🕒', m.key)
            const json = await Scrape.uploadImageV3(img)
            clips.reply(m.chat, json.data.url, m)
         }
     }
      } catch (e) {
         return clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   limit: true
}