exports.run = {
   noxious: ['delwarn'],
   category: 'group',
   async: async (m, {
      clips
   }) => {
      try { 
         let user = global.db.users.find(v => v.jid == m.sender)
         let check = (m.isGroup) ? global.db.groups.find(v => v.jid == m.chat).member[m.sender] : user
         let forPoint = ((200 / 300) * user.point).toFixed(0)
         let forLimit = ((200 / 300) * user.limit).toFixed(0)
         if (check.warning == 0) return clips.reply(m.chat, Func.texted('bold', `Anda tidak memiliki poin peringatan.`), m)
         if (user.point < forPoint || user.limit < forLimit) return clips.reply(m.chat, Func.texted('bold', `Aset yang Anda miliki tidak cukup untuk menghapus poin peringatan.`), m)
         user.point -= forPoint
         user.limit -= forLimit
         check.warning -= 1
         let teks = '- ' + Func.h2k(forPoint) + ' Point (-50%)\n'
         teks += '- ' + Func.h2k(forLimit) + ' Limit (-50%)\n'
         teks += '*Berhasil menghapus 1 poin peringatan.*'
         return clips.reply(m.chat, teks, m)
      } catch (e) {
         clips.reply(m.chat, global.status.error, m)
      }
   },
   error: false
}