exports.run = {
   noxious: ['me'],
   category: 'user info',
   async: async (m, {
      clips,
      isPrefix,
      blockList
   }) => {
      let user = global.db.users.find(v => v.jid == m.sender)
      let pic = await Func.fetchBuffer('./media/image/default.jpg')
      let _own = [...new Set([env.owner, ...global.db.setting.owners])]
      try {
         pic = await Func.fetchBuffer(await clips.profilePictureUrl(m.sender, 'image'))
      } catch {} finally {
         let blocked = blockList.includes(m.sender) ? true : false
         let now = new Date() * 1
         let lastseen = (user.lastseen == 0) ? 'Never' : Func.toDate(now - user.lastseen)
         let usebot = (user.usebot == 0) ? 'Never' : Func.toDate(now - user.usebot)
         let caption = `⼷  *U S E R - P R O F I L E*\n\n`
         caption += `	◎ *Name* : ${user.names ? user.names : m.pushName}\n`
         caption += `	◎ *Point* : ${Func.formatNumber(user.point)}\n`
         caption += `	◎ *Guard* : ${Func.formatNumber(user.guard)}\n`
         caption += `	◎ *Limit* : ${Func.formatNumber(user.limit)}\n`
         caption += `	◎ *Level* : ${Func.level(user.point, env.multiplier)[0]} (${Func.rolex(Func.level(user.point, env.multiplier)[0])})\n`
         caption += `	◎ *Hitstat* : ${Func.formatNumber(user.hit)}\n`
         caption += `	◎ *Warning* : ${((m.isGroup) ? (typeof global.db.groups.find(v => v.jid == m.chat).member[m.sender] != 'undefined' ? global.db.groups.find(v => v.jid == m.chat).member[m.sender].warning : 0) + ' / 5' : user.warning + ' / 5')}\n\n`
         caption += `⼷  *U S E R - S T A T U S*\n\n`
         caption += `	◎ *Blocked* : ${(blocked ? '√' : '×')}\n`
         caption += `	◎ *Banned* : ${(new Date - user.banTemp < env.timer) ? Func.toTime(new Date(user.banTemp + env.timer) - new Date()) + ' (' + ((env.timer / 1000) / 60) + ' min)' : user.banned ? '√' : '×'}\n`
         caption += `	◎ *Use In Private* : ${(global.db.chats.map(v => v.jid).includes(m.sender) ? '√' : '×')}\n`
         caption += `	◎ *Taken* : ${(user.taken ? '√' : '×')}\n`
         caption += `	◎ *Loved* : ${user.taken ? '@' + user.partner.split`@`[0] : '-'}\n`
         caption += `	◎ *Premium* : ${(user.premium ? '√' : '×')}\n`
         caption += `	◎ *Expired* : ${user.expired == 0 ? '-' : Func.timeReverse(user.expired - new Date() * 1)}\n\n`
         caption += global.footer
         clips.sendFile(m.chat, images, 'imags.jpg', caption, m)
      }
   },
   error: false,
   cache: true,
   location: __filename
}
