exports.run = {
   regex: /^(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/,
   async: async (m, {
      clips,
      body,
      users,
      setting,
      prefixes,
   }) => {
      try {
         const regex = /^(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/;
         const extract = body ? Func.generateLink(body) : null
         if (extract) {
            const links = extract.filter(v => v.match(regex))
            if (links.length != 0) {
               if (users.limit > 0) {
                  let limit = 1
                  if (users.limit >= limit) {
                     users.limit -= limit
                  } else return clips.reply(m.chat, Func.texted('bold', `🚩 Your limit is not enough to use this feature.`), m)
               }
               clips.sendReact(m.chat, '🕒', m.key)
               let old = new Date()
               Func.hitstat('ytmp4', m.sender)
               links.map(async link => {
            const json = await Api.nexon('/youtube-video', {
                           url: link
                        })
            if (!json.status) return clips.reply(m.chat, Func.jsonFormat(json), m)
            let caption = `⼷  *Y T - M P 4*\n\n`
            caption += `	◎  *Title* : ${json.data.title}\n`
            caption += `	◎  *Duration* : ${json.data.duration}\n`
            caption += `	◎  *Published* : ${json.data.published}\n`
            caption += `	◎  *Description* : ${json.data.description}\n\n`
            caption += global.footer
            clips.sendMessageModify(m.chat, caption, m, {
                 largeThumb: true, 
                 thumbnail: await Func.fetchBuffer(json.data.thumbnail)
            }).then(async() => {
            let tes = await clips.sendFile(m.chat, json.data.url, `${json.data.title}.mp4`, '', m)   
            clips.sendFile(m.chat, json.data.url, `${json.data.title}.mp4`, '', tes, {
                     document: true,
                     APIC: await Func.fetchBuffer(json.data.thumbnail)
               })   
            })
           })
         }
       }
      } catch (e) {
         console.log(e)
         return clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   limit: true,
   download: true
}