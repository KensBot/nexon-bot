exports.run = {
   noxious: ['afk'],
   use: 'reason (optional)',
   category: 'user info',
   async: async (m, {
      clips,
      text
   }) => {
         let users = global.db.users.find(v => v.jid == m.sender)
         users.afk = +new Date
         users.afkReason = text
         users.afkObj = m
         clips.reply(m.chat, `${m.sender.split`@` [0]} has Afk`, m)
   },
   error: false,
   group: true
}