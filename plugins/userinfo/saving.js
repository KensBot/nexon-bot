const moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')
exports.run = {
   noxious: ['saving', 'withdraw', 'hsv', 'hwd', 'mysaving'],
   category: 'user info',
   async: async (m, {
      clips,
      args,
      isPrefix,
      command
   }) => {
      try {
         if (command == 'saving') {
            if (!args || !args[0]) return clips.reply(m.chat, Func.example(isPrefix, command, '10000'), m)
            let user = global.db.users.find(v => v.jid == m.sender)
            if (user.point == 0) return clips.reply(m.chat, Func.texted('bold', `🚩 You have no point.`), m)
            if (isNaN(args[0])) return clips.reply(m.chat, Func.texted('bold', `🚩 The nominal point must be a number.`), m)
            if (args[0] < 10000) return clips.reply(m.chat, Func.texted('bold', `🚩 Minimum 10000 point to save.`), m)
            if (args[0] > user.point) return clips.reply(m.chat, Func.texted('bold', `🚩 The point you have is not enough to save.`), m)
            user.point -= parseInt(args[0])
            user.balance += parseInt(args[0])
            user.savings_history.push({
               sn: Func.makeId(5),
               nominal: parseInt(args[0]),
               type: 'SAVING',
               date: new Date * 1
            })
            let teks = `⼷  *S A V I N G*\n\n`
            teks += `Successfully saved point into savings with the amount ${Func.formatNumber(args[0])}\n\n`
            teks += `➠ *Total* : ${Func.forrmater(global.db.users.find(v => v.jid == m.sender).point)}\n`
            teks += `➠ *SN* : ${Func.makeId(5)}`
            clips.reply(m.chat, teks, m)
         } else if (command == 'withdraw') {
            if (!args || !args[0]) return clips.reply(m.chat, Func.example(isPrefix, command, '10000'), m)
            let user = global.db.users.find(v => v.jid == m.sender)
            if (user.balance == 0) return clips.reply(m.chat, Func.texted('bold', `🚩 You have no savings.`), m)
            if (isNaN(args[0])) return clips.reply(m.chat, Func.texted('bold', `🚩 The nominal point must be a number.`), m)
            if (args[0] < 10000) return clips.reply(m.chat, Func.texted('bold', `🚩 Minimum 10000 point to withdraw.`), m)
            if (args[0] > user.balance) return clips.reply(m.chat, Func.texted('bold', `🚩 Point exceeds your current savings amount.`), m)
            user.point += parseInt(args[0])
            user.balance -= parseInt(args[0])
            user.savings_history.push({
               sn: Func.makeId(5),
               nominal: parseInt(args[0]),
               type: 'WITHDRAW',
               date: new Date * 1
            })
            let teks = `⼷  *W I T H D R A W*\n\n`
            teks += `Successfully withdraw point with the amount ${Func.formatNumber(args[0])}\n\n`
            teks += `➠ *Total* : ${Func.formatNumber(global.db.users.find(v => v.jid == m.sender).balance)}\n`
            teks += `➠ *SN* : ${Func.makeId(5)}`
            clips.reply(m.chat, teks, m)
         } else if (command == 'hsv') {
            let data = global.db.users.find(v => v.jid == m.sender)
            if (data.balance == 0) return clips.reply(m.chat, Func.texted('bold', `🚩 Empty data!`), m)
            let SV_P = data.savings_history.filter(v => v.type == 'SAVING')
            if (SV_P.length == 0) return clips.reply(m.chat, Func.texted('bold', `🚩 Empty data!`), m)
            SV_P.sort((a, b) => b.date - a.date)
            let teks = `⼷  *S A V I N G*\n\n`
            teks += SV_P.slice(0, 20).map((v, i) => (i + 1) + '. Save point on _' + moment(v.date).format('DD/MM/YY HH:mm:ss') + '_\n	◦  *Nominal* :  ' + Func.formatNumber(v.nominal) + '\n	◦  *SN* :  ' + v.sn).join`\n\n`
            teks += `\n\n${global.footer}`
            clips.reply(m.chat, teks, m)
         } else if (command == 'hwd') {
            let data = global.db.users.find(v => v.jid == m.sender)
            if (data.balance == 0) return clips.reply(m.chat, Func.texted('bold', `🚩 Empty data!`), m)
            let WD_P = data.savings_history.filter(v => v.type == 'WITHDRAW')
            if (WD_P.length == 0) return clips.reply(m.chat, Func.texted('bold', `🚩 Empty data!`), m)
            WD_P.sort((a, b) => b.date - a.date)
            let teks = `⼷  *W I T H D R A W*\n\n`
            teks += WD_P.slice(0, 20).map((v, i) => (i + 1) + '. Withdraw on _' + moment(v.date).format('DD/MM/YY HH:mm:ss') + '_\n	◦  *Nominal* :  ' + Func.formatNumber(v.nominal) + '\n	◦  *SN* :  ' + v.sn).join`\n\n`
            teks += `\n\n${global.footer}`
            clips.reply(m.chat, teks, m)
         } else if (command == 'mysaving') {
            let user = global.db.users.find(v => v.jid == m.sender)
            if (user.balance < 1) return clips.reply(m.chat, Func.texted('bold', `🚩 You have no savings.`), m)
            clips.reply(m.chat, Func.texted('bold', `🚩 You have savings of ${Func.usd(user.balance)} Point.`), m)
         }
      } catch (e) {
         clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false
}