exports.run = {
   noxious: ['disable', 'enable'],
   use: 'command',
   category: 'owner',
   async: async (m, {
      clips,
      args,
      isPrefix,
      command,
      plugins
   }) => {
      let cmd = global.db.setting
      if (!args || !args[0]) return clips.reply(m.chat, Func.example(isPrefix, command, 'tiktok'), m)
      let commands = Func.arrayJoin(Object.values(Object.fromEntries(Object.entries(plugins).filter(([name, prop]) => prop.run.usage))).map(v => v.run.usage))
      if (!commands.includes(args[0])) return clips.reply(m.chat, Func.texted('bold', `Command ${isPrefix + args[0]} tidak ada.`), m)
      if (command == 'disable') {
         if (cmd.error.includes(args[0])) return clips.reply(m.chat, Func.texted('bold', `${isPrefix + args[0]} command sebelumnya dinonaktifkan.`), m)
         cmd.error.push(args[0])
         clips.reply(m.chat, Func.texted('bold', `Command ${isPrefix + args[0]} berhasil dinonaktifkan.`), m)
      } else if (command == 'enable') {
         if (!cmd.error.includes(args[0])) return clips.reply(m.chat, Func.texted('bold', `Command ${isPrefix + args[0]} tidak ada.`), m)
         cmd.error.forEach((data, index) => {
            if (data === args[0]) cmd.error.splice(index, 1)
         })
         clips.reply(m.chat, Func.texted('bold', `Command ${isPrefix + args[0]} berhasil diaktifkan.`), m)
      }
   },
   owner: true
}