exports.run = {
   noxious: ['+toxic', '-toxic'],
   use: 'word',
   category: 'owner',
   async: async (m, {
      clips,
      args,
      isPrefix,
      command
   }) => {
      try {
         if (command == '+toxic') {
            if (!args || !args[0]) return clips.reply(m.chat, Func.example(isPrefix, command, 'fuck'), m)
            if (global.db.setting.toxic.includes(args[0])) return clips.reply(m.chat, Func.texted('bold', `'${args[0]}' sudah ada di database.`), m)
            global.db.setting.toxic.push(args[0])
            global.db.setting.toxic.sort(function(a, b) {
               if (a < b) {
                  return -1;
               }
               if (a > b) {
                  return 1;
               }
               return 0
            })
            clips.reply(m.chat, Func.texted('bold', `'${args[0]}' berhasil ditambahkan!`), m)
         } else if (command == '-toxic') {
            if (!args || !args[0]) return clips.reply(m.chat, Func.example(isPrefix, command, 'fuck'), m)
            if (global.db.setting.toxic.length < 2) return clips.reply(m.chat, Func.texted('bold', `Maaf, Anda tidak dapat menghapus lebih banyak.`), m)
            if (!global.db.setting.toxic.includes(args[0])) return clips.reply(m.chat, Func.texted('bold', `'${args[0]}' tidak ada di database.`), m)
            global.db.setting.toxic.forEach((data, index) => {
               if (data === args[0]) global.db.setting.toxic.splice(index, 1)
            })
            clips.reply(m.chat, Func.texted('bold', `'${args[0]}' telah dihapus.`), m)
         }
      } catch (e) {
         console.log(e)
         return clips.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   owner: true,
   cache: true,
   location: __filename
}