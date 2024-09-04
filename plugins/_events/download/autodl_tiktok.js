exports.run = {
   regex: /^(?:https?:\/\/)?(?:www\.|vt\.|vm\.|t\.)?(?:tiktok\.com\/)(?:\S+)?$/,
   async: async (m, {
      clips,
      body,
      users,
      setting,
      prefixes
   }) => {
      try {
         const regex = /^(?:https?:\/\/)?(?:www\.|vt\.|vm\.|t\.)?(?:tiktok\.com\/)(?:\S+)?$/;
         const extract = body ? Func.generateLink(body) : null
         if (extract) {
            const links = extract.filter(v => Func.ttFixed(v).match(regex))
            if (links.length != 0) {
               if (users.limit > 0) {
                  let limit = 1
                  if (users.limit >= limit) {
                     users.limit -= limit
                  } else return clips.reply(m.chat, Func.texted('bold', `🚩 Your limit is not enough to use this feature.`), m)
               }
               clips.sendReact(m.chat, '🕒', m.key)
               let old = new Date()
               Func.hitstat('tiktok', m.sender)
               links.map(async link => {
                  const json = await Api.nexon('/tiktok', {
                       url: Func.ttFixed(link)
                   });
                  if (!json.status) return clips.reply(m.chat, Func.jsonFormat(json), m)
                  let caption = `⼷  *T I K T O K*\n\n`
                  caption += `	◎  *Author* : ${json.data.author.nickname} (@${json.data.author.unique_id})\n`
                  caption += `	◎  *Views* : ${Func.formatter(json.data.view)}\n`
                  caption += `	◎  *Play* : ${Func.formatter(json.data.play)}\n`
                  caption += `	◎  *Shares* : ${Func.formatter(json.data.share)}\n`
                  caption += `	◎  *Comments* : ${Func.formatter(json.data.comment)}\n`
                  caption += `	◎  *Duration* : ${Func.timeFormat(json.data.duration)}\n`
                  caption += `	◎  *Caption* : ${json.data.title || '-'}\n`
                  caption += `	◎  *Fetching* : ${((new Date - old) * 1)} ms\n\n`
                  caption += global.footer
                  if (json.data.video) return clips.sendFile(m.chat, json.data.video, 'video.mp4', caption, m)
                  if (json.data.photo) {
                     for (let p of json.data.photo) {
                        clips.sendFile(m.chat, p, 'image.jpg', caption, m)
                        await Func.delay(1500)
                     }
                  }
               })
            }
         }
      } catch (e) {
         return clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   limit: true,
   download: true
}