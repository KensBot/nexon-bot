exports.run = {
   noxious: ['toanime'],
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
            let q = m.quoted ? m.quoted.message[type] : m.msg
            if (/image/.test(type)) {
        	clips.sendReact(m.chat, '🕒', m.key)
            let img = await clips.downloadMediaMessage(q)
            let json = await Scrape.uploadImageV3(img)
            let old = new Date()
            let jsonq = await Api.nexon('/toanime', {
                            url: json.data.url
                        })
            clips.sendFile(m.chat, jsonq.data.url, '', `🍟 *Proses* : ${((new Date - old) * 1)} ms`, m)
            } else clips.reply(m.chat, Func.texted('bold', `🚩 Only for photo.`), m)
            } else {
            clips.sendReact(m.chat, '🕒', m.key)
            let q = m.quoted ? m.quoted : m
            let mime = (q.msg || q).mimetype || ''
            if (!mime) return clips.reply(m.chat, Func.texted('bold', `🚩 Reply photo.`), m)
            if (!/image\/(jpe?g|png|webp)/.test(mime)) return clips.reply(m.chat, Func.texted('bold', `🚩 Only for photo.`), m)
            let img = await q.download()
            let old = new Date()
            let json = await Scrape.uploadImageV3(img)
            let jsonq = await Api.nexon('/toanime', {
                            url: json.data.url
                        })
            clips.sendFile(m.chat, jsonq.data.url, '', `🍟 *Proses* : ${((new Date - old) * 1)} ms`, m)
           }
      } catch (e) {
      	console.log(e)
         return clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   limit: true,
   premium: true,
   cache: true,
   location: __filename
}