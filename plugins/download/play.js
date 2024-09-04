exports.run = {
   noxious: ['play', 'playmp4'],
   hidden: ['playvid', 'video'],
   use: 'query',
   category: 'downloader',
   async: async (m, {
    clips, 
    text, 
    isPrefix, 
    command, 
    users 
   }) => {
      try {
         if (command == 'play') {
         if (!text) return clips.reply(m.chat, Func.example(isPrefix, command, 'lathi'), m)
         if (/^(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/.test(text)) return clips.reply(m.chat, status.fail, m)
         clips.sendReact(m.chat, '🕒', m.key)
         const json = await Api.nexon('/play-audio', {
                           q: text
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
            clips.sendFile(m.chat, json.data.url, `${json.data.title}.mp3`, caption, tes, {
                     document: true,
                     APIC: await Func.fetchBuffer(json.data.thumbnail)
                  })   
            })
         } else if (command == 'playmp4' || command == 'video' || command == 'playvid') {
     	if (!text) return clips.reply(m.chat, Func.example(isPrefix, command, 'lathi'), m)
         if (/^(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/.test(text)) return clips.reply(m.chat, status.fail, m)
         clips.sendReact(m.chat, '🕒', m.key)
         const json = await Api.nexon('/play-video', {
                           q: text
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
            let tes = await clips.sendFile(m.chat, json.data.url, `${json.data.title}.mp4`, caption, m)   
            clips.sendFile(m.chat, json.data.url, `${json.data.title}.mp4`, caption, tes, {
                     document: true,
                     APIC: await Func.fetchBuffer(json.data.thumbnail)
                  })   
            })
        }
         } catch (e) {
         console.log(e)
         return clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   limit: true,
   restrict: true,
   cache: true,
   location: __filename
}