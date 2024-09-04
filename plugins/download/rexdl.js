exports.run = {
   noxious: ['rexdl'],
   use: 'link',
   category: 'downloader',
   async: async (m, {
      clips,
      args,
      isPrefix,
      command,
      users
   }) => {
      try {
         if (!args || !args[0]) return clips.reply(m.chat, Func.example(isPrefix, command, 'https://rexdl.com/android/xplayer-video-player-all-format-apk.html/'), m)
         if (!args[0].match(/(https:\/\/rexdl.com\/)/gi)) return clips.reply(m.chat, global.status.invalid, m)
         clips.sendReact(m.chat, '🕒', m.key)
         let json = await Api.nexon('/rexdl', {
                        url: args[0]
                    })
         if (!json.status) return clips.reply(m.chat, Func.jsonFormat(json), m)
         let text = `⼷  *R E X D L*\n\n`
         text += '	◎  *Name* : ' + json.data.name + '\n'
         text += '	◎  *Size* : ' + json.data.size + '\n'
         text += '	◎  *Update* : ' + json.data.update + '\n'
         text += '	◎  *Version* : ' + json.data.version + '\n'
         text += '	◎  *Password* : ' + json.data.password + '\n\n'
         text += global.footer
         const chSize = Func.sizeLimit(json.data.size, users.premium ? env.max_upload : env.max_upload_free)
         const isOver = users.premium ? `💀 File size (${json.data.size}) exceeds the maximum limit.` : `⚠️ File size (${json.data.size}), you can only download files with a maximum size of ${env.max_upload_free} MB and for premium users a maximum of ${env.max_upload} MB.`
         if (chSize.oversize) return clips.reply(m.chat, isOver, m)
         clips.sendMessageModify(m.chat, text, m, {
            largeThumb: true,
            thumbnail: await Func.fetchBuffer('https://telegra.ph/file/d4eca09d6068ee1e18a05.jpg')
         }).then(async () => {
            json.data.map(async v => {
                  clips.sendFile(m.chat, v.url, v.filename, '', m)
                  await Func.delay(1000)
               })
         })
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