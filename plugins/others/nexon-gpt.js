exports.run = {
   noxious: ['nexon-gpt'],
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
    let json = await Api.nexon('/nexon-gpt', {
                     query: text,
                     session: m.sender
               })
    if (!json.status) return clips.reply(m.chat, Func.jsonFormat(json), m)
    clips.reply(m.chat, json.data, m)
    } catch (e) {
      console.log(e)
      clips.reply(m.chat, global.status.error, m)
     }
  },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}