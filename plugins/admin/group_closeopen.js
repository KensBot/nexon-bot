const moment = require('moment-timezone')
exports.run = {
   noxious: ['group'],
   use: 'open / close',
   category: 'admin',
   async: async (m, {
      clips,
      args,
      isPrefix,
      command
   }) => {
      if (!args || !args[0]) return clips.reply(m.chat, Func.texted('bold', `ðŸš© Enter argument close or open.`), m)
      if (args[0] == 'open') {
         await clips.groupSettingUpdate(m.chat, 'not_announcement').then(() => m.reply(`⼷  *G R O U P - O P E N*\n\n${Func.texted('monospace', 'Tanggal : ' + Func.localtime(new Date()))}\n${Func.texted('monospace', 'Jam : ' + moment.tz('Asia/Jakarta').format('HH:mm'))}\n\n*Group Berhasil Di Buka Oleh Admin*`))
      } else if (args[0] == 'close') {
         await clips.groupSettingUpdate(m.chat, 'announcement').then(() => m.reply(`⼷  *G R O U P - C L O S E*\n\n${Func.texted('monospace', 'Tanggal : ' + Func.localtime(new Date()))}\n${Func.texted('monospace', 'Jam : ' + moment.tz('Asia/Jakarta').format('HH:mm'))}\n\n*Group Berhasil Di Tutup Oleh Admin*`))
      }
   },
   group: true,
   admin: true,
   botAdmin: true
}