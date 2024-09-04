exports.run = {
   noxious: ['tiktok', 'tikmp3', 'tikwm'],
   hidden: ['tt'],
   use: 'link',
   category: 'downloader',
   async: async (m, {
      clips,
      args,
      isPrefix,
      command
   }) => {
      try {
         if (!args || !args[0]) return clips.reply(m.chat, Func.example(isPrefix, command, 'https://vm.tiktok.com/ZSR7c5G6y/'), m)
         if (!args[0].match('tiktok.com')) return clips.reply(m.chat, global.status.invalid, m)
         clips.sendReact(m.chat, '🕒', m.key)
         let old = new Date()
         const json = await Api.nexon('/tiktok', {
                          url: Func.ttFixed(args[0])
                      })
         if (!json.status) return m.reply(Func.jsonFormat(json))
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
         if (command == 'tiktok' || command == 'tt') {
                if (json.data.video) return clips.sendFile(m.chat, json.data.video, 'video.mp4', caption, m)
            if (json.data.photo) {
               for (let p of json.data.photo) {
                  clips.sendFile(m.chat, p, 'image.jpg', caption, m)
                  await Func.delay(1500)
               }
            }
         }
         if (command == 'tikwm') return clips.sendFile(m.chat, json.data.videoWM, 'video.mp4', caption, m)
         if (command == 'tikmp3') return !json.data.audio ? clips.reply(m.chat, global.status.fail, m) : clips.sendFile(m.chat, json.data.audio, 'audio.mp3', '', m)
      } catch (e) {
         return clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}