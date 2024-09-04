exports.run = {
   noxious: ['ai-image'],
   use: 'query',
   category: 'others',
   async: async (m, {
      clips,
      text,
      isPrefix,
      command
   }) => {
      try {
         if (!text) return clips.reply(m.chat, Func.example(isPrefix, command, `panda`), m)
         clips.sendReact(m.chat, '🕒', m.key)
         let old = new Date()
         let json = await Api.nexon('/ai-image', {
                       q: text
                    })
         for (let i = 0; i < 3; i++) {
     	result = json.data.aiImageData[Math.floor(Math.random() * json.data.aiImageData.length)]   
         clips.sendFile(m.chat, result.images[0].url, '', `${result.name}\n🍟 *Fetching* : ${((new Date - old) * 1)} ms`, m)
         await Func.delay(2000)
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