exports.run = {
   noxious: ['+mimic', '-mimic'],
   use: 'mention or reply',
   category: 'owner',
   async: async (m, {
      clips,
      text,
      isPrefix,
      command
   }) => {
      let number = isNaN(text) ? (text.startsWith('+') ? text.replace(/[()+\s-]/g, '') : (text).split`@` [1]) : text
      if (!text && !m.quoted) return clips.reply(m.chat, Func.texted('bold', `Mention or Reply chat target.`), m)
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
         let people = global.db.setting
         if (command == '+mimic') {
            if (people.mimic.includes(user)) return clips.reply(m.chat, Func.texted('bold', `@${user.replace(/@.+/, '')} sebelumnya ditambahkan ke mimic.`), m)
            people.mimic.push(user)
            clips.reply(m.chat, Func.texted('bold', `Berhasil ditambahkan @${user.replace(/@.+/, '')} ke mimic.`), m)
         } else if (command == '-mimic') {
            if (!people.mimic.includes(user)) return clips.reply(m.chat, Func.texted('bold', `@${user.replace(/@.+/, '')} tidak ada dalam database mimic.`), m)
            people.mimic.forEach((data, index) => {
               if (data === user) people.mimic.splice(index, 1)
            })
            clips.reply(m.chat, Func.texted('bold', `Berhasil menghapus @${user.replace(/@.+/, '')} dari mimic.`), m)
         }
      }
   },
   owner: true
}