exports.run = {
   noxious: ['mediafire'],
   hidden: ['mf'],
   use: 'link',
   category: 'downloader',
   async: async (m, {
      clips,
      args,
      isPrefix,
      command,
      users
   }) => {
      try {
         if (!args || !args[0]) return clips.reply(m.chat, Func.example(isPrefix, command, 'https://www.mediafire.com/file/1fqjqg7e8e2v3ao/YOWA.v8.87_By.SamMods.apk/file'), m)
         if (!args[0].match(/(https:\/\/www.mediafire.com\/)/gi)) return clips.reply(m.chat, global.status.invalid, m)
         clips.sendReact(m.chat, '🕒', m.key)
         let json = await Api.nexon('/mediafire', {
                          url: args[0]
                   })
         if (!json.status) return clips.reply(m.chat, Func.jsonFormat(json), m)
         let text = `⼷  *M E D I A F I R E*\n\n`
         text += '	◎  *Name* : ' + json.data.filename + '\n'
         text += '	◎  *Size* : ' + json.data.size + '\n'
         text += '	◎  *Extension* : ' + json.data.extension + '\n'
         text += '	◎  *Mime* : ' + json.data.mime + '\n'
         text += '	◎  *Uploaded* : ' + json.data.uploaded + '\n\n'
         text += global.footer
         const chSize = Func.sizeLimit(json.data.size, users.premium ? env.max_upload : env.max_upload_free)
         const isOver = users.premium ? `💀 File size (${json.data.size}) exceeds the maximum limit.` : `⚠️ File size (${json.data.size}), you can only download files with a maximum size of ${env.max_upload_free} MB and for premium users a maximum of ${env.max_upload} MB.`
         if (chSize.oversize) return clips.reply(m.chat, isOver, m)
         clips.sendMessageModify(m.chat, text, m, {
            largeThumb: true,
            thumbnail: await Func.fetchBuffer('https://telegra.ph/file/fcf56d646aa059af84126.jpg')
         }).then(async () => {
            clips.sendFile(m.chat, json.data.link, json.data.filename, '', m)
         })
      } catch (e) {
      console.log(e)
         return clips.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}