exports.run = {
   noxious: ['ava'],
   use: 'mention or reply',
   category: 'group',
   async: async (m, {
      clips,
      text
   }) => {
      let number = isNaN(text) ? (text.startsWith('+') ? text.replace(/[()+\s-]/g, '') : (text).split`@` [1]) : text
      if (!text && !m.quoted) return clips.reply(m.chat, Func.texted('bold', `🚩 Mention or reply chat target.`), m)
      if (isNaN(number)) return clips.reply(m.chat, Func.texted('bold', `🚩 Invalid number.`), m)
      if (number.length > 15) return clips.reply(m.chat, Func.texted('bold', `🚩 Invalid format.`), m)
      try {
         if (text) {
            var user = number + '@s.whatsapp.net'
         } else if (m.quoted.sender) {
            var user = m.quoted.sender
         } else if (m.mentionedJid) {
            var user = number + '@s.whatsapp.net'
         }
      } catch (e) {} finally {
         let pic = false
         try {
            pic = await clips.profilePictureUrl(user, 'image')
         } catch {} finally {
            if (!pic) return clips.reply(m.chat, Func.texted('bold', `🚩 He/She didn't put a profile picture.`), m)
            clips.sendFile(m.chat, pic, '', '', m)
         }
      }
   },
   error: false,
   cache: true,
   location: __filename
}