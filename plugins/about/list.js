const moment = require('moment-timezone')
moment.tz.setDefault(global.timezone)
exports.run = {
   noxious: ['list'],
   category: 'about',
   async: async (m, {
      clips,
      args,
      isPrefix,
      isOwner,
      command
   }) => {
      try {
          let buttons = [{
             name: 'single_select',
             buttonParamsJson: JSON.stringify({
                title: 'Tap Here!',
                sections: [{
                    rows: [{
                       title: 'BANNED',
                       description: ``,
                       id: `${isPrefix + command} 1`
                   }, {
                       title: 'ERROR COMMAND',
                       description: ``,
                       id: `${isPrefix + command} 2`
                   }, {
                       title: 'MIMIC',
                       description: ``,
                       id: `${isPrefix + command} 3`
                   }, {
                       title: 'INACTIVE PLUGIN',
                       description: ``,
                       id: `${isPrefix + command} 4`
                   }, {
                       title: 'PREMIUM',
                       description: ``,
                       id: `${isPrefix + command} 5`
                   }, {
                       title: 'PRIVATE CHAT',
                       description: ``,
                       id: `${isPrefix + command} 6`
                     }]
                 }]
             })
         }]
         if (!args || !args[0]) return clips.sendNMessages(m.chat, buttons, m, {
            header: global.botname,
            content: '🚩 Choose data type you want to see.',
            footer: global.footer
         })
         if (args[0] == 1) {
            const data = global.db.users.filter(v => v.banned)
            if (data.length == 0) return clips.reply(m.chat, Func.texted('bold', `🚩 Empty data.`), m)
            let teks = `乂  *B A N L I S T*\n\n`
            teks += data.map(v => '	◦ @' + v.jid.replace(/@.+/, '')).join('\n') + '\n\n'
            teks += global.footer
            clips.sendMessageModify(m.chat, teks, m, {
               ads: false,
               largeThumb: true
            })
         } else if (args[0] == 2) {
            const data = global.db.setting.error
            if (data.length == 0) return clips.reply(m.chat, Func.texted('bold', `🚩 Empty data.`), m)
            let teks = `乂  *E R R L I S T*\n\n`
            teks += data.map(cmd => '	◦ ' + isPrefix + cmd).join('\n') + '\n\n'
            teks += global.footer
            clips.sendMessageModify(m.chat, teks, m, {
               ads: false,
               largeThumb: true
            })
         } else if (args[0] == 3) {
            const data = global.db.setting.mimic
            if (data.length == 0) return clips.reply(m.chat, Func.texted('bold', `🚩 Empty data.`), m)
            let teks = `乂  *M I C L I S T*\n\n`
            teks += data.map(jid => '	◦ @' + jid.replace(/@.+/, '')).join('\n') + '\n\n'
            teks += global.footer
            clips.sendMessageModify(m.chat, teks, m, {
               ads: false,
               largeThumb: true
            })
         } else if (args[0] == 4) {
            const data = global.db.setting.pluginDisable
            if (data.length == 0) return clips.reply(m.chat, Func.texted('bold', `🚩 Empty data.`), m)
            let teks = `乂  *P L U G L I S T*\n\n`
            teks += data.map(plugin => '	◦ ' + plugin + '.js').join('\n') + '\n\n'
            teks += global.footer
            clips.sendMessageModify(m.chat, teks, m, {
               ads: false,
               largeThumb: true
            })
         } else if (args[0] == 5) {
            const data = global.db.users.filter(v => v.premium)
            if (data.length == 0) return clips.reply(m.chat, Func.texted('bold', `🚩 Empty data.`), m)
            let teks = `乂  *P R E M L I S T*\n\n`
            teks += data.map(v => '	◦ @' + v.jid.replace(/@.+/, '') + '\n	 *Limit* : ' + Func.formatNumber(v.limit) + '\n	 *Expired* : ' + Func.timeReverse(v.expired - new Date() * 1)).join('\n') + '\n\n'
            teks += global.footer
            clips.sendMessageModify(m.chat, teks, m, {
               ads: false,
               largeThumb: true
            })
         } else if (args[0] == 6) {
            if (!isOwner) return clips.reply(m.chat, global.status.owner, m)
            const data = global.db.chats.filter(v => v.jid.endsWith('.net'))
            if (data.length == 0) return clips.reply(m.chat, Func.texted('bold', `🚩 Empty data.`), m)
            let teks = `乂  *C H A T L I S T*\n\n`
            teks += data.sort((a, b) => b.lastseen - a.lastseen).map(v => '	◦ @' + v.jid.replace(/@.+/, '') + '\n	     *Chat* : ' + Func.formatNumber(v.chat) + '\n	     *Lastchat* : ' + moment(v.lastseen).format('DD/MM/YY HH:mm:ss')).join('\n') + '\n\n'
            teks += global.footer
            clips.sendMessageModify(m.chat, teks, m, {
               ads: false,
               largeThumb: true
            })
         }
      } catch (e) {
         clips.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   cache: true,
   private: false,
   location: __filename
}