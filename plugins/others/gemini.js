exports.run = {
   noxious: ['gemini'],
   use: 'query',
   category: 'others',
   async: async (m, {
     clips, 
     text, 
     command, 
     isPrefix
   }) => {
     try {
    if (!text) return clips.reply(m.chat, Func.example(isPrefix, command, `Hallo nama kamu siapa?`), m)
      clips.sendReact(m.chat, '🕒', m.key)
      let json = await Api.nexon('/gemini', {
                     q: text
                })
      clips.reply(m.chat, json.data.msg, m)
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