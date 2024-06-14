exports.run = {
   noxious: ['q'],
   use: 'reply chat',
   category: 'group',
   async: async (m, {
      clips,
      store
   }) => {
      try {
         if (!m.quoted) return clips.reply(m.chat, Func.texted('bold', `🚩 Reply to message that contain quoted.`), m)
         const msg = await store.loadMessage(m.chat, m.quoted.id)
         if (msg.quoted === null) return clips.reply(m.chat, Func.texted('bold', `🚩 Message does not contain quoted.`), m)
         return clips.copyNForward(m.chat, msg.quoted.fakeObj)
      } catch (e) {
         clips.reply(m.chat, `🚩 Can't load message.`, m)
      }
   },
   error: false,
   cache: true,
   location: __filename
}