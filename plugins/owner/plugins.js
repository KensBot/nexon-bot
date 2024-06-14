exports.run = {
   noxious: ['plugen', 'plugdis'],
   use: 'plugin name',
   category: 'owner',
   async: async (m, {
      clips,
      args,
      isPrefix,
      command,
      plugins: plugs
   }) => {
	  let pluginDisable = global.db.setting.pluginDisable
      if (!args || !args[0]) return clips.reply(m.chat, Func.example(isPrefix, command, 'tiktok'), m)
      let plugins = Object.keys(plugs)
      if (!plugins.includes(args[0])) return clips.reply(m.chat, Func.texted('bold', `Plugin ${args[0]}.js tidak ditemukan.`), m)
      if (command == 'plugdis') {
         if (pluginDisable.includes(args[0])) return clips.reply(m.chat, Func.texted('bold', `Plugin ${args[0]}.js sebelumnya telah dinonaktifkan.`), m)
         pluginDisable.push(args[0])
         clips.reply(m.chat, Func.texted('bold', `Plugin ${args[0]}.js successfully disabled.`), m)
      } else if (command == 'plugen') {
         if (!pluginDisable.includes(args[0])) return clips.reply(m.chat, Func.texted('bold', `Plugin ${args[0]}.js tidak ditemukan.`), m)
         pluginDisable.forEach((data, index) => {
            if (data === args[0]) pluginDisable.splice(index, 1)
         })
         clips.reply(m.chat, Func.texted('bold', `Plugin ${args[0]}.js berhasil diaktifkan.`), m)
      }
   },
   owner: true
}