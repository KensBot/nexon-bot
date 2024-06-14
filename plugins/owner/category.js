exports.run = {
   noxious: ['+hide', '-hide'],
   use: 'category',
   category: 'owner',
   async: async (m, {
      clips,
      args,
      isPrefix,
      command,
      plugins
   }) => {
      let categories = [...new Set(Object.values(Object.fromEntries(Object.entries(plugins).filter(([name, prop]) => prop.run.category))).map(v => v.run.category))]
      if (!args || !args[0]) return clips.reply(m.chat, Func.example(isPrefix, command, 'downloader'), m)
      if (!categories.includes(args[0])) return clips.reply(m.chat, Func.texted('bold', `${args[0]} kategori tidak ada.`), m)
      if (command == '+hide') {
         if (global.db.setting.hidden.includes(args[0])) return clips.reply(m.chat, Func.texted('bold', `Category ${args[0]} sebelumnya disembunyikan.`), m)
         global.db.setting.hidden.push(args[0])
         clips.reply(m.chat, Func.texted('bold', `${args[0]} category berhasil disembunyikan.`), m)
      } else if (command == '-hide') {
         if (!global.db.setting.hidden.includes(args[0])) return clips.reply(m.chat, Func.texted('bold', `${args[0]} category tidak ada.`), m)
         global.db.setting.hidden.forEach((data, index) => {
            if (data === args[0]) global.db.setting.hidden.splice(index, 1)
         })
         clips.reply(m.chat, Func.texted('bold', `${args[0]} category telah dihapus dari daftar tersembunyi.`), m)
      }
   },
   owner: true
}