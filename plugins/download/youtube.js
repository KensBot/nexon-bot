exports.run = {
   noxious: ['ytmp3', 'ytmp4'],
   hidden: ['yta', 'ytv'],
   use: 'link',
   category: 'downloader',
   async: async (m, {
      clips,
      args,
      text,
      isPrem,
      isPrefix,
      command,
      users
   }) => {
      try {
         if (/yt?(a|mp3)/i.test(command)) {
            if (!args || !args[0]) return clips.reply(m.chat, Func.example(isPrefix, command, 'https://youtu.be/zaRFmdtLhQ8'), m)
            if (!/^(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/.test(args[0])) return clips.reply(m.chat, global.status.invalid, m)
            clips.sendReact(m.chat, '🕒', m.key)
            const json = await Api.nexon('/youtube-audio', {
                           url: args[0]
                        })
            if (!json.status) return clips.reply(m.chat, Func.jsonFormat(json), m)
            let caption = `⼷  *Y T - P L A Y*\n\n`
            caption += `	◎  *Title* : ${json.data.title}\n`
            caption += `	◎  *Duration* : ${json.data.duration}\n`
            caption += `	◎  *Published* : ${json.data.published}\n`
            caption += `	◎  *Description* : ${json.data.description}\n\n`
            caption += global.footer
            clips.sendMessageModify(m.chat, caption, m, {
                 largeThumb: true, 
                 thumbnail: await Func.fetchBuffer(json.data.thumbnail)
            }).then(async() => {
            let tes = await clips.sendFile(m.chat, json.data.url, `${json.data.title}.mp3`, caption, m)   
            clips.sendFile(m.chat, json.data.url, `${json.data.title}.mp3`, '', tes, {
                     document: true,
                     APIC: await Func.fetchBuffer(json.data.thumbnail)
                  })   
            })
            } else if (/yt?(v|mp4)/i.test(command)) {
            if (!args[0]) return clips.reply(m.chat, Func.example(isPrefix, command, 'https://youtu.be/zaRFmdtLhQ8'), m)
            if (!/^(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/.test(args[0])) return clips.reply(m.chat, global.status.invalid, m)
            clips.sendReact(m.chat, '🕒', m.key)
            const json = await Api.nexon('/youtube-video', {
                           url: args[0]
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
         }
      } catch (e) {
      	console.log(e)
         return clips.reply(m.chat, status.error, m)
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}