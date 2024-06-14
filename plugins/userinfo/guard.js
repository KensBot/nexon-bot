exports.run = {
   noxious: ['guard'],
   async: async (m, {
      clips,
      isPrefix
   }) => {
      let user = global.db.users.find(v => v.jid == m.sender)
      if (user.guard < 1) return clips.reply(m.chat, `🚩 Kamu tidak mempunyai guard.`, m)
      clips.reply(m.chat, Func.texted('bold', `🚩 You have as many guards as you can ${Func.h2k(Func.formatNumber(user.guard))} (${Func.formatNumber(user.guard)}).`), m)
   },
   error: false
}