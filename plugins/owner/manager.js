exports.run = {
   noxious: ['+owner', '-owner', '-prem', '+block', '-block', '+ban', '-ban'],
   use: 'mention or reply',
   category: 'owner',
   async: async (m, {
      clips,
      text,
      command
   }) => {
      try {
         let input = text ? text : m.quoted ? m.quoted.sender : m.mentionedJid.length > 0 ? m.mentioneJid[0] : false
         if (!input) return clips.reply(m.chat, Func.texted('bold', `Mention or reply chat target.`), m)
         let p = await clips.onWhatsApp(input.trim())
         if (p.length == 0) return clips.reply(m.chat, Func.texted('bold', `Invalid number.`), m)
         let jid = clips.decodeJid(p[0].jid)
         let number = jid.replace(/@.+/, '')
         if (command == '+owner') { // add owner number
            let owners = global.db.setting.owners
            if (owners.includes(number)) return clips.reply(m.chat, Func.texted('bold', `Target is already the owner.`), m)
            owners.push(number)
            clips.reply(m.chat, Func.texted('bold', `Successfully added @${number} as owner.`), m)
         } else if (command == '-owner') { // remove owner number
            let owners = global.db.setting.owners
            if (!owners.includes(number)) return clips.reply(m.chat, Func.texted('bold', `Target is not owner.`), m)
            owners.forEach((data, index) => {
               if (data === number) owners.splice(index, 1)
            })
            clips.reply(m.chat, Func.texted('bold', `Successfully removing @${number} from owner list.`), m)
         } else if (command == '-prem') { // remove premium
            let data = global.db.users.find(v => v.jid == jid)
            if (typeof data == 'undefined') return clips.reply(m.chat, Func.texted('bold', `Can't find user data.`), m)
            if (!data.premium) return clips.reply(m.chat, Func.texted('bold', `Not a premium account.`), m)
            data.limit = global.limit
            data.premium = false
            data.expired = 0
            clips.reply(m.chat, Func.texted('bold', `@${jid.replace(/@.+/, '')}'s premium status has been successfully deleted.`), m)
         } else if (command == '+block') { // block user
            if (jid == clips.decodeJid(clips.user.id)) return clips.reply(m.chat, Func.texted('bold', `??`), m)
            clips.updateBlockStatus(jid, 'block').then(res => m.reply(Func.jsonFormat(res)))
         } else if (command == '-block') { // unblock user
            clips.updateBlockStatus(jid, 'unblock').then(res => m.reply(Func.jsonFormat(res)))
         } else if (command == '+ban') { // banned user
            let is_user = global.db.users
            let is_owner = [clips.decodeJid(clips.user.id).split`@` [0], global.owner, ...global.db.setting.owners].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(jid)
            if (!is_user.some(v => v.jid == jid)) return clips.reply(m.chat, Func.texted('bold', `🚩 User data not found.`), m)
            if (is_owner) return clips.reply(m.chat, Func.texted('bold', `🚩 Can't banned owner number.`), m)
            if (jid == clips.decodeJid(clips.user.id)) return clips.reply(m.chat, Func.texted('bold', `??`), m)
            if (is_user.find(v => v.jid == jid).banned) return clips.reply(m.chat, Func.texted('bold', `Target already banned.`), m)
            is_user.find(v => v.jid == jid).banned = true
            let banned = is_user.filter(v => v.banned).length
            clips.reply(m.chat, `乂  *B A N N E D*\n\n*“Successfully added @${jid.split`@`[0]} into banned list.”*\n\n*Total : ${banned}*`, m)
         } else if (command == '-ban') { // unbanned user
            let is_user = global.db.users
            if (!is_user.some(v => v.jid == jid)) return clips.reply(m.chat, Func.texted('bold', `User data not found.`), m)
            if (!is_user.find(v => v.jid == jid).banned) return clips.reply(m.chat, Func.texted('bold', `Target not banned.`), m)
            is_user.find(v => v.jid == jid).banned = false
            let banned = is_user.filter(v => v.banned).length
            clips.reply(m.chat, `乂  *U N B A N N E D*\n\n*“Succesfully removing @${jid.split`@`[0]} from banned list.”*\n\n*Total : ${banned}*`, m)
         }
      } catch (e) {
         clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   owner: true,
   cache: true,
   location: __filename
}
