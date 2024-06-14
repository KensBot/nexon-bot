exports.run = {
   noxious: ['ohidetag'],
   hidden: ['o'],
   use: 'text',
   category: 'owner',
   async: async (m, {
      clips,
      text,
      participants
   }) => {
      let users = participants.map(u => u.id)
      await clips.reply(m.chat, text, null, {
         mentions: users
      })
   },
   owner: true,
   group: true
}