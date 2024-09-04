const yts = require('yt-search')
exports.run = {
   noxious: ['ytsearch'],
   hidden: ['yts', 'ytfind', 'mp3', 'mp4'],
   use: 'query',
   category: 'downloader',
   async: async (m, {
      clips,
      text,
      isPrefix,
      command,
      users,
      args
   }) => {
      try {
         if (command == 'mp3') {
            if (args && !args[0]) return
            const json = await Api.nexon('/youtube-audio', {
                           url: args[0]
                        })
            if (!json.status) return clips.reply(m.chat, Func.jsonFormat(json), m)
            clips.sendReact(m.chat, '🕒', m.key)
            
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
         }
         if (command == 'mp4') {
         if (args && !args[0]) return
         const json = await Api.nexon('/youtube-video', {
                           url: args[0]
                        })
         if (!json.status) return clips.reply(m.chat, Func.jsonFormat(json), m)
         clips.sendReact(m.chat, '🕒', m.key)
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
         if (command == 'yts' || command == 'ytsearch') {
         if (!text) return clips.reply(m.chat, Func.example(isPrefix, command, 'lathi'), m)
         clips.sendReact(m.chat, '🕒', m.key)
         const json = await Api.nexon('/youtube-search', {
                           q: text
                        })
         if (!json.data || json.data.length < 1) return clips.reply(m.chat, global.status.fail, m)
            let ytm3 = []
            json.data.map(v => ytm3.push({
               title: v.title,
               description: `Author : ${v.author.name} / ${v.timestamp}`,
               id: `${isPrefix}mp3 ${v.url}`
            }))
            let ytm4 = []
            json.data.map(v => ytm4.push({
               title: v.title,
               description: `Author : ${v.author.name} / ${v.timestamp}`,
               id: `${isPrefix}mp4 ${v.url}`
            }))
            const buttons = [{
            name: 'single_select',
            buttonParamsJson: JSON.stringify({
               title: 'Tap Here!',
               sections: [{
                title: "Download Mp3/Audio",
                  rows: ytm3
               }, {
                title: "Download Mp4/Video",
                  rows: ytm4
                 }]
            })
         }]
         clips.sendNMessages(m.chat, buttons, m, {
            header: '',
            content: `Showing search results for : “${text}”, select below the title you want to download. 🍟`,
            footer: global.footer,
         })
         }
      } catch (e) {
         console.log(e)
         return clips.reply(m.chat, status.error, m)
      }
   },
   error: false,
   limit: true,
   restrict: true,
   cache: true,
   location: __filename
}