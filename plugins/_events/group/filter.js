exports.run = {
   async: async (m, {
      clips,
      body,
      users,
      groupSet,
      setting,
      isAdmin,
      isBotAdmin
   }) => {
      try {
         if (groupSet.filter && !isAdmin && isBotAdmin && !m.fromMe) {
            let toxic = setting.toxic
            if (body && (new RegExp('\\b' + toxic.join('\\b|\\b') + '\\b')).test(body.toLowerCase())) {
               groupSet.member[m.sender].warning += 1
               let warning = groupSet.member[m.sender].warning
               if (warning > 4) return clips.sendMessageModify(m.chat, Func.texted('bold', `Warning : [ 5 / 5 ], good bye ~~`), m, {
               largeThumb: true,
               thumbnail: 'https://telegra.ph/file/52bfa1fe109500da92a2f.jpg'}).then(() => {
                  clips.groupParticipantsUpdate(m.chat, [m.sender], 'remove').then(async () => {
                     groupSet.member[m.sender].warning = 0
                     clips.sendMessage(m.chat, {
                        delete: {
                           remoteJid: m.chat,
                           fromMe: isBotAdmin ? false : true,
                           id: m.key.id,
                           participant: m.sender
                        }
                     })
                  })
               })
               return clips.sendMessageModify(m.chat, `⼷  *W A R N I N G* \n\nYou got warning : [ ${warning} / 5 ]\n\If you get 5 warnings you will be kicked automatically from the group.`, m, { 
               largeThumb: true,
               thumbnail: 'https://telegra.ph/file/52bfa1fe109500da92a2f.jpg'}).then(() => clips.sendMessage(m.chat, {
                  delete: {
                     remoteJid: m.chat,
                     fromMe: isBotAdmin ? false : true,
                     id: m.key.id,
                     participant: m.sender
                  }
               }))
            }
         }
      } catch (e) {
         return clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   group: true
}
