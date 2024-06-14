exports.run = {
   async: async (m, {
      clips,
      body,
      users
   }) => {
      try {
         let afk = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
         for (let jid of afk) {
            let is_user = global.db.users.find(v => v.jid == jid)
            if (!is_user) continue
            let afkTime = is_user.afk
            if (!afkTime || afkTime < 0) continue
            let reason = is_user.afkReason || ''
            if (!m.fromMe) {
               clips.reply(m.chat, `*Away From Keyboard* : @${jid.split('@')[0]}\n• *Reason* : ${reason ? reason : '-'}\n• *During* : [ ${Func.toTime(new Date - afkTime)} ]`, m).then(async () => {
                  clips.reply(jid, `Someone from *${await (await clips.groupMetadata(m.chat)).subject}*'s group, tagged or mention you.\n\n• *Sender* : @${m.sender.split('@')[0]}`, m).then(async () => {
                     await clips.copyNForward(jid, m)
                  })
               })
            }
         }
      } catch (e) {
         return clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   group: true,
   cache: true,
   location: __filename
}