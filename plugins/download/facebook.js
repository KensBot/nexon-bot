exports.run = {
   noxious: ['fb'],
   hidden: ['fbdl', 'fbvid'],
   use: 'link',
   category: 'downloader',
   async: async (m, {
      clips,
      args,
      isPrefix,
      command
   }) => {
      try {
         if (!args || !args[0]) return clips.reply(m.chat, Func.example(isPrefix, command, 'https://fb.watch/7B5KBCgdO3'), m)
         if (!args[0].match(/(?:https?:\/\/(web\.|www\.|m\.)?(facebook|fb)\.(com|watch)\S+)?$/)) return clips.reply(m.chat, global.status.invalid, m)
         clips.sendReact(m.chat, '🕒', m.key)
         let json = await Api.nexon('/facebook', {
                        url: args[0]
                   })
         if (!json.status) return clips.reply(m.chat, Func.jsonFormat(json), m)
         let result = json.data.find(v => v.type == 'HD' && v.response == 200)
         if (result) {
            clips.sendFile(m.chat, result.url, Func.filename('mp4'), `◉ *Quality* : HD`, m)
         } else {
            let result = json.data.find(v => v.type == 'SD' && v.response == 200)
            if (!result) return clips.reply(m.chat, global.status.fail, m)
            clips.sendFile(m.chat, result.url, Func.filename('mp4'), `◉ *Quality* : SD`, m)
         }
      } catch (e) {
         console.log(e)
         return clips.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}