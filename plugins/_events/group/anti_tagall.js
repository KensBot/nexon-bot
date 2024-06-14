exports.run = {
   async: async (m, {
      clips,
      isAdmin,
      isOwner
   }) => {
      try {
         if (!isOwner && !isAdmin && !m.isBot && m.mentionedJid.length > 10) return clips.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
      } catch (e) {
         return clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   group: true,
   botAdmin: true,
   cache: true,
   location: __filename
}