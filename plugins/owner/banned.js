exports.run = {
   noxious: ['+ban', '-ban'],
   use: 'mention or reply',
   category: 'owner',
   async: async (m, {
      clips,
      text,
      command,
      participants
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
         let is_user = global.db.users
         let is_owner = [global.clips.user.id.split`@` [0], global.owner, ...global.db.setting.owners].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(user)
         if (!is_user.some(v => v.jid == user)) return clips.reply(m.chat, Func.texted('bold', `Data pengguna tidak ditemukan.`), m)
         if (command == '+ban') {
            if (is_owner) return clips.reply(m.chat, Func.texted('bold', `Tidak dapat melarang nomor pemilik.`), m)
            if (user == clips.user.id) return clips.reply(m.chat, Func.texted('bold', `??`), m)
            if (is_user.find(v => v.jid == user).banned) return clips.reply(m.chat, Func.texted('bold', `Target sudah dibanned.`), m)
            is_user.find(v => v.jid == user).banned = true
            let banned = is_user.filter(v => v.banned).length
            clips.reply(m.chat, `乂  *B A N N E D*\n\n*“Berhasil ditambahkan @${user.split`@`[0]} ke dalam daftar banned.”*\n\n*Total : ${banned}*`, m)
         } else if (command == '-ban') {
            if (!is_user.find(v => v.jid == user).banned) return clips.reply(m.chat, Func.texted('bold', `Target tidak di banned.`), m)
            is_user.find(v => v.jid == user).banned = false
            let banned = is_user.filter(v => v.banned).length
            clips.reply(m.chat, `乂  *U N B A N N E D*\n\n*“Berhasil menghapus @${user.split`@`[0]} dari daftar terlarang.”*\n\n*Total : ${banned}*`, m)
         }
      }
   },
   owner: true,
   cache: true,
   location: __filename
}