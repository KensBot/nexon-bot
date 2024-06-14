exports.run = {
   noxious: ['link'],
   hidden: ['getlink', 'linkgc', 'linkgroup'],
   category: 'group',
   async: async (m, {
      clips,
      groupMetadata,
      participants
   }) => {
         let meta = await (await clips.groupMetadata(m.chat))
         let admin = await clips.groupAdmin(m.chat)
         let member = participants.map(u => u.id)
         let pp = await Func.fetchBuffer(await clips.profilePictureUrl(m.chat, 'image')).catch(_ => 'https://telegra.ph/file/19c06533dd59ca3059b34.jpg')
         let txt = '⼷  *G R O U P - L I N K*\n\n'
         txt += '*Name* : ' + meta.subject + '\n'
         txt += '*Id Group* :\n➾ ' + meta.id + '\n\n'
         txt += '*Link* :\n➾ https://chat.whatsapp.com/' + (await clips.groupInviteCode(m.chat)) + '\n\n'
         txt += global.footer
      await clips.sendMessageModify(m.chat, txt, m, {
          ads: true,
          largeThumb:true,
          thumbnail: pp,
          url: global.db.setting.link})
   },
   error: false,
   group: true,
   botAdmin: true
}