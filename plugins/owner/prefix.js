exports.run = {
   noxious: ['prefix', '+prefix', '-prefix'],
   use: 'symbol',
   category: 'owner',
   async: async (m, {
      clips,
      args,
      isPrefix,
      command
   }) => {
      let system = global.db.setting
      if (command == 'prefix') {
         if (!args || !args[0]) return clips.reply(m.chat, Func.example(isPrefix, command, '#'), m)
         if (args[0].length > 1) return clips.reply(m.chat, Func.texted('bold', `Masukkan hanya 1 prefix.`), m)
         if (evaluate_chars.includes(args[0])) return clips.reply(m.chat, Func.texted('bold', `Tidak bisa menggunakan prefix ${args[0]} karena akan terjadi error.`), m)
         if (args[0] == system.prefix) return clips.reply(m.chat, Func.texted('bold', `Prefix ${args[0]} saat ini digunakan`), m)
         system.onlyprefix = args[0]
         clips.reply(m.chat, Func.texted('bold', `🚩 Prefix berhasil diubah menjadi : ${args[0]}`), m)
      } else if (command == '+prefix') {
         if (!args || !args[0]) return clips.reply(m.chat, Func.example(isPrefix, command, '#'), m)
         if (args[0].length > 1) return clips.reply(m.chat, Func.texted('bold', `Masukkan hanya 1 prefix.`), m)
         if (evaluate_chars.includes(args[0])) return clips.reply(m.chat, Func.texted('bold', `Tidak dapat menambahkan prefix ${args[0]} karena akan terjadi kesalahan.`), m)
         if (system.prefix.includes(args[0])) return clips.reply(m.chat, Func.texted('bold', `Prefix ${args[0]} sudah ada di database.`), m)
         system.prefix.push(args[0])
         clips.reply(m.chat, Func.texted('bold', `Prefix ${args[0]} berhasil ditambahkan.`), m)
      } else if (command == '-prefix') {
         if (!args || !args[0]) return clips.reply(m.chat, Func.example(isPrefix, command, '#'), m)
         if (args[0].length > 1) return clips.reply(m.chat, Func.texted('bold', `Masukkan hanya 1 prefix.`), m)
         if (system.prefix.lenght < 2) return clips.reply(m.chat, Func.texted('bold', `Tidak dapat menghapus lebih banyak prefix.`), m)
         if (!system.prefix.includes(args[0])) return clips.reply(m.chat, Func.texted('bold', `Prefix ${args[0]} tidak ada di database.`), m)
         system.prefix.forEach((data, index) => {
            if (data === args[0]) system.prefix.splice(index, 1)
         })
         clips.reply(m.chat, Func.texted('bold', `Prefix ${args[0]} berhasil dihapus.`), m)
      }
   },
   owner: true,
   cache: true,
   location: __filename
}