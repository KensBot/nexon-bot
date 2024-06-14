exports.run = {
   noxious: ['everyone'],
   hidden: ['tagall'],
   use: 'text (optional)',
   category: 'admin',
   async: async (m, {
      clips,
      text,
      participants
   }) => {
      try {
         let member = participants.map(v => v.id)
         let readmore = String.fromCharCode(8206).repeat(4001)
         let message = (!text) ? 'Hello everyone, admin mention you in ' + await (await clips.groupMetadata(m.chat)).subject + ' group.' : text
         clips.reply(m.chat, `⼷  *E V E R Y O N E*\n\n*“${message}”*\n${readmore}\n${member.map(v => '◎  @' + v.replace(/@.+/, '')).join('\n')}`, m)
      } catch (e) {
         console.log(e)
         return clips.reply(m.chat, global.status.error, m)
      }
   },
   admin: true,
   group: true
}