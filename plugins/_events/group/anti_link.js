exports.run = {
   async: async (m, {
      clips,
      body,
      groupSet,
      isAdmin
   }) => {
      try {
         // delete link then kick when antilink is turned on
         if (groupSet.antilink && !isAdmin && body) {
            if (m.msg.matchedText && m.msg.matchedText.match(/(chat.whatsapp.com)/gi) && !m.msg.matchedText.includes(await clips.groupInviteCode(m.chat)) || body.match(/(chat.whatsapp.com)/gi) && !body.includes(await clips.groupInviteCode(m.chat)) || body.match(/(wa.me)/gi)) return clips.sendMessage(m.chat, {
               delete: {
                  remoteJid: m.chat,
                  fromMe: false,
                  id: m.key.id,
                  participant: m.sender
               }
            }).then(() => clips.groupParticipantsUpdate(m.chat, [m.sender], 'remove'))
         }
         
         // it only removes the link when antilink turned off
         if (!groupSet.antilink && !isAdmin && body) {
            if (m.msg.matchedText && m.msg.matchedText.match(/(chat.whatsapp.com)/gi) && !m.msg.matchedText.includes(await clips.groupInviteCode(m.chat)) || body.match(/(chat.whatsapp.com)/gi) && !body.includes(await clips.groupInviteCode(m.chat)) || body.match(/(wa.me)/gi)) return clips.sendMessage(m.chat, {
               delete: {
                  remoteJid: m.chat,
                  fromMe: false,
                  id: m.key.id,
                  participant: m.sender
               }
            })
         }      
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