exports.run = {
   async: async (m, {
      clips,
      groupSet,
      store
   }) => {
      try {
         if (groupSet.antidelete && m.msg && m.msg.type == 0) {
            const copy = await clips.deleteObj(m, clips, store)
            if (copy) {
               clips.sendSticker(m.chat, await Func.fetchBuffer('./media/sticker/remove.webp'), m, {
                  packname: global.db.setting.sk_pack,
                  author: global.db.setting.sk_author
               }).then(async () => {
                  await clips.copyNForward(m.chat, copy)
               })
            }
         }
      } catch (e) {
         return clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   group: true,
   cache: true,
   location: __filename
}