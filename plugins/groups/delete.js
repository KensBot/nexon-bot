exports.run = {
   noxious: ['delete'],
   hidden: ['del'],
   use: 'reply chat',
   category: 'group',
   async: async (m, {
      clips,
      isBotAdmin
   }) => {
      if (!m.quoted) return
      clips.sendMessage(m.chat, {
         delete: {
            remoteJid: m.chat,
            fromMe: isBotAdmin ? false : true,
            id: m.quoted.id,
            participant: m.quoted.sender
         }
      }).then(async () => { 
      await clips.sendReact(m.chat, '✅', m.key)
      })
   },
   error: false,
   group: true
}