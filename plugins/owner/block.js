exports.run = {
   noxious: ['+block', '-block'],
   use: 'mention or reply',
   category: 'owner',
   async: async (m, {
      clips,
      text,
      isPrefix,
      command,
      participants
   }) => {
      let number = isNaN(text) ? (text.startsWith('+') ? text.replace(/[()+\s-]/g, '') : (text).split`@` [1]) : text
      if (!text && !m.quoted) return clips.reply(m.chat, Func.texted('bold', `Tag atau Balas target obrolan.`), m)
      if (isNaN(number)) return clips.reply(m.chat, Func.texted('bold', `Invalid number.`), m)
      if (number.length > 15) return clips.reply(m.chat, Func.texted('bold', `Invalid format.`), m)
      try {
         if (text) {
            var user = number + '@s.whatsapp.net'
         } else if (m.quoted.sender) {
            var user = m.quoted.sender
         } else if (m.mentionedJid) {
            var user = number + '@s.whatsapp.net'
         }
      } catch (e) {} finally {
         // let ownerF = [global.clips.user.id.split`@` [0], global.owner, ...global.db.setting.owners].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(user)
         // if (ownerF) return clips.reply(m.chat, Func.texted('bold', `You can't block owner number.`), m)
         if (user == clips.user.id.split(':')[0] + 's.whatsapp.net') return clips.reply(m.chat, Func.texted('bold', `??`), m)
         if (command == '+block') return clips.updateBlockStatus(user, 'block')
         if (command == '-block') return clips.updateBlockStatus(user, 'unblock')
      }
   },
   owner: true
}