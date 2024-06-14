exports.run = {
   noxious: ['outsider'],
   use: '(option)',
   category: 'admin',
   async: async (m, {
      clips,
      args,
      isPrefix,
      command,
      participants
   }) => {
      try {
         let member = participants.filter(v => !v.admin).map(v => v.id).filter(v => !v.startsWith('62') && v != clips.decodeJid(clips.user.id))
         if (!args || !args[0]) {
            if (member.length == 0) return clips.reply(m.chat, Func.texted('bold', `🚩 This group is clean from outsiders.`), m)
            let teks = `✅ *${member.length}* outsiders found, send *${isPrefix + command} -y* to remove them.\n\n`
            teks += member.map(v => '◎  @' + v.replace(/@.+/, '')).join('\n')
            clips.reply(m.chat, teks, m)
         } else if (args[0] == '-y') {
            for (let jid of member) {
               await Func.delay(2000)
               await clips.groupParticipantsUpdate(m.chat, [jid], 'remove')
            }
            await clips.reply(m.chat, Func.texted('bold', `🚩 Done, ${member.length} outsiders successfully removed.`), m)
         }
      } catch (e) {
         clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   admin: true,
   group: true,
   botAdmin: true
}