exports.run = {
   noxious: ['join'],
   use: 'group link',
   category: 'owner',
   async: async (m, {
      clips,
      args,
      isPrefix,
      command
   }) => {
      try {
         if (!args || !args[0]) return clips.reply(m.chat, Func.example(isPrefix, command, 'https://chat.whatsapp.com/codeInvite'), m)
         let link = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i
         let [_, code] = args[0].match(link) || []
         if (!code) return clips.reply(m.chat, global.status.invalid, m)
         let id = await clips.groupAcceptInvite(code)
         if (!id.endsWith('g.us')) return clips.reply(m.chat, Func.texted('bold', `🚩 Sorry i can't join to this group :(`), m)
         let member = await (await clips.groupMetadata(id)).participants.map(v => v.id)
         return clips.reply(m.chat, `🚩 Joined!`, m)
      } catch {
         return clips.reply(m.chat, Func.texted('bold', `🚩 Sorry i can't join to this group :(`), m)
      }
   },
   owner: true
}