exports.run = {
   noxious: ['bc', 'bcgc', 'bcr', 'bcgcv', 'bcv'],
   use: 'text or reply media',
   category: 'owner',
   async: async (m, {
      clips,
      text,
      command
   }) => {
      try {
      let q = m.quoted ? m.quoted : m
      let mime = (q.msg || q).mimetype || ''
      let chatJid = global.db.chats.filter(v => v.jid.endsWith('.net')).map(v => v.jid)
      let groupList = async () => Object.entries(await clips.groupFetchAllParticipating()).slice(0).map(entry => entry[1])
      let groupJid = await (await groupList()).map(v => v.id)
      let receiverJid = global.db.setting.receiver.length != 0 ? global.db.setting.receiver.map(v => v + '@c.us') : []
      const id = (command == 'bc' || command == 'bcv') ? chatJid : command == 'bcr' ? receiverJid : groupJid
      if (id.length == 0) return clips.reply(m.chat, Func.texted('bold', `Kesalahan, ID tidak ada.`), m)
      clips.sendReact(m.chat, '🕒', m.key)
      if (text) {
         for (let jid of id) {
            await Func.delay(1500)
            clips.sendMessageModify(jid, text, null, {
               title: global.botname,
               thumbnail: await Func.fetchBuffer('https://telegra.ph/file/898705bb5bcfd9b1cb906.jpg'),
               largeThumb: true,
               url: global.db.setting.link,
               mentions: command == 'bcgc' ? await (await clips.groupMetadata(jid)).participants.map(v => v.id) : []
            })
         }
         clips.reply(m.chat, Func.texted('bold', `Berhasil mengirim pesan Broadcast ke ${id.length} ${command == 'bc' ? 'chats' : 'groups'}`), m)
      } else if (/image\/(webp)/.test(mime)) {
         for (let jid of id) {
            await Func.delay(1500)
            let media = await q.download()
            await clips.sendSticker(jid, media, null, {
               packname: global.db.setting.sk_pack,
               author: global.db.setting.sk_author,
               mentions: command == 'bcgc' ? await (await clips.groupMetadata(jid)).participants.map(v => v.id) : []
            })
         }
         clips.reply(m.chat, Func.texted('bold', `Berhasil mengirim pesan Broadcast ke ${id.length} ${command == 'bc' ? 'chats' : 'groups'}`), m)
      } else if (/video|image\/(jpe?g|png)/.test(mime)) {
         for (let jid of id) {
            await Func.delay(1500)
            let media = await q.download()
            await clips.sendFile(jid, media, '', q.text ? '⼷  *B R O A D C A S T*\n\n' + q.text : '', null, null,
               command == 'bcgc' ? {
                  contextInfo: {
                     mentionedJid: await (await clips.groupMetadata(jid)).participants.map(v => v.id)
                  }
               } : command == 'bcgcv' ? {
                  viewOnce: true,
                  contextInfo: {
                     mentionedJid: await (await clips.groupMetadata(jid)).participants.map(v => v.id)
                  }
               } : command == 'bcv' ? {
                  viewOnce: true
               } : {})
         }
         clips.reply(m.chat, Func.texted('bold', `Berhasil mengirim pesan Broadcast ke ${id.length} ${command == 'bc' ? 'chats' : 'groups'}`), m)
      } else if (/audio/.test(mime)) {
         for (let jid of id) {
            await Func.delay(1500)
            let media = await q.download()
            await clips.sendFile(jid, media, '', '', null, null,
               command == 'bcgc' ? {
                  ptt: q.ptt,
                  contextInfo: {
                     mentionedJid: await (await clips.groupMetadata(jid)).participants.map(v => v.id)
                  }
               } : {})
         }
         clips.reply(m.chat, Func.texted('bold', `Berhasil mengirim pesan Broadcast ke ${id.length} ${command == 'bc' ? 'chats' : 'groups'}`), m)
      } else clips.reply(m.chat, Func.texted('bold', `Media / teks tidak ditemukan atau media tidak didukung.`), m)
      } catch (e) {
         clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   owner: true
}