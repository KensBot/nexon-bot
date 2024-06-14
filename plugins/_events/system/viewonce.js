exports.run = {
   async: async (m, {
      clips,
      body
   }) => {
      try {
      
         if (m.msg && m.msg.viewOnce && !m.fromMe && m.isGroup) {
            let media = await clips.downloadMediaMessage(m.msg)
            if (/image/.test(m.mtype)) {
               clips.sendFile(m.chat, media, Func.filename('jpg'), body ? body : '', m)
            } else if (/video/.test(m.mtype)) {
               clips.sendFile(m.chat, media, Func.filename('mp4'), body ? body : '', m)
            }
         }
      } catch (e) {
         console.log(e)
         // return clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   group: true,
   cache: true,
   location: __filename
}