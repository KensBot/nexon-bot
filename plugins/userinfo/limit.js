exports.run = {
   noxious: ['limit'],
   category: 'user info',
   async: async (m, {
      clips,
      isPrefix,
   }) => {
   try {
      let user = global.db.users.find(v => v.jid == m.sender)
      if (user.limit < 1) return clips.reply(m.chat, `Your bot usage limit has expired and will be reset at 00.00 WIB\n\nTo get more limits upgrade to premium send *${isPrefix}premium* or buy them with points using commands *${isPrefix}buy*`, ml)
      clips.reply(m.chat, `🍟 Your limit : [ *${Func.formatNumber(user.limit)}* ]${!user.premium ? `\n\nTo get more limits, upgrade to premium shipping plan *${isPrefix}premium*` : ''}`, m)
    } catch (e) {
      clips.reply(m.chat, Func.jsonFormat(e), m)
    }
  },
   error: false
}