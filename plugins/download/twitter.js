exports.run = {
   noxious: ['twitter'],
   hidden: ['twitterdl'],
   use: 'link',
   category: 'downloader',
   async: async (m, {
      clips,
      args,
      isPrefix,
      command
   }) => {
      try {
         if (!args || !args[0]) return clips.reply(m.chat, Func.example(isPrefix, command, 'https://twitter.com/mosidik/status/1475812845249957889?s=20'), m)
         if (!args[0].match(/(twitter.com)/gi)) return clips.reply(m.chat, global.status.invalid, m)
         clips.sendReact(m.chat, '🕒', m.key)
         let json = await Api.nexon('/twitter', {
                       url: args[0]
                    })
         if (!json.status) return clips.reply(m.chat, global.status.fail, m)
         let caption = `⼷  *T W I T T E R*\n\n`
         caption += `	◎  *Author* : ${json.data.desc}\n`
         caption += `	◎  *Quality* : HD\n\n`
         caption+= global.footer
         clips.sendFile(m.chat, json.data.HD, '', caption, m)
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