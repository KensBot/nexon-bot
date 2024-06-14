exports.run = {
   noxious: ['remini'],
   use: 'reply photo',
   category: 'converter',
   async: async (m, {
      clips,
      text,
      isPrefix,
      command
   }) => {
        try {
            if (m.quoted ? m.quoted.message : m.msg.viewOnce) {
            let type = m.quoted ? Object.keys(m.quoted.message)[0] : m.mtype
            let old = new Date()
            let q = m.quoted ? m.quoted.message[type] : m.msg
            if (/image/.test(type)) {
        	clips.sendReact(m.chat, '🕒', m.key)
            let img = await clips.downloadMediaMessage(q)
            let json = await Api.remini(img, "enhance")
            clips.sendFile(m.chat, json, 'image.jpg', `🍟 *Proses* : ${((new Date - old) * 1)} ms`, m)
            } else clips.reply(m.chat, Func.texted('bold', `🚩 Only for photo.`), m)
            } else {
            let q = m.quoted ? m.quoted : m
            let mime = (q.msg || q).mimetype || ''
            if (!mime) return clips.reply(m.chat, Func.texted('bold', `🚩 Reply photo.`), m)
            let old = new Date()
            if (!/image\/(jpe?g|png)/.test(mime)) return clips.reply(m.chat, Func.texted('bold', `🚩 Only for photo.`), m)
            clips.sendReact(m.chat, '🕒', m.key)
            let img = await q.download()
            let json = await Api.remini(img, "enhance")
            clips.sendFile(m.chat, json, 'image.jpg', `🍟 *Proses* : ${((new Date - old) * 1)} ms`, m)
           }
      } catch (e) {
         return clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   limit: true
}