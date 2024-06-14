exports.run = {
   noxious: ['changename'],
   use: 'text',
   category: 'owner',
   async: async (m, {
      clips,
      text,
      isPrefix,
      command
   }) => {
      try {
         if (!text) return clips.reply(m.chat, Func.example(isPrefix, command, 'Kens bot'), m)
         if (text.length > 25) return clips.reply(m.chat, `Teks terlalu panjang, maksimal 25 karakter.`, m)
         clips.authState.creds.me.name = text
         await props.save(global.db)
         return clips.reply(m.chat, `Nama berhasil diubah.`, m)
      } catch {
         return clips.reply(m.chat, Func.texted('bold', `Nama gagal diubah.`), m)
      }
   },
   owner: true
}