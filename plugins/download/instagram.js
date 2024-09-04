exports.run = {
   noxious: ['instagram'],
   hidden: ['igdl', 'ig'],
   use: 'link',
   category: 'downloader',
   async: async (m, {
      clips,
      args,
      isPrefix,
      command
   }) => {
      try {
         if (!args || !args[0]) return clips.reply(m.chat, Func.example(isPrefix, command, 'https://www.instagram.com/p/CK0tLXyAzEI'), m)
         if (!args[0].match(/(https:\/\/www.instagram.com)/gi)) return clips.reply(m.chat, global.status.invalid, m)
         clips.sendReact(m.chat, '🕒', m.key)
         let old = new Date()
         const json = await Api.nexon('/instagram', {
                           url: Func.igFixed(args[0])
                      })
         if (!json.status) return m.reply(Func.jsonFormat(json))
           for (let v of json.data) {
              clips.sendFile(m.chat, v.url, v.type == 'mp4' ? Func.filename('mp4') : Func.filename('jpg'), `🍟 *Fetching* : ${((new Date - old) * 1)} ms`, m)
              await Func.delay(1500)
           }
      } catch (e) {
         console.log(e)
         return clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}