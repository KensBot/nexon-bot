exports.run = {
   regex: /^(?:https?:\/\/)?(?:www\.)?(?:mediafire\.com\/)(?:\S+)?$/,
   async: async (m, {
      clips,
      body,
      users,
      setting
   }) => {
      try {
         const regex = /^(?:https?:\/\/)?(?:www\.)?(?:mediafire\.com\/)(?:\S+)?$/;
         const extract = body ? Func.generateLink(body) : null
         if (extract) {
            const links = extract.filter(v => v.match(regex))
            if (links.length != 0) {
               if (users.limit > 0) {
                  let limit = 1
                  if (users.limit >= limit) {
                     users.limit -= limit
                  } else return clips.reply(m.chat, Func.texted('bold', `🚩 Your limit is not enough to use this feature.`), m)
               }
               clips.sendReact(m.chat, '🕒', m.key)
               let old = new Date()
               Func.hitstat('mediafire', m.sender)
               links.map(async link => {
                  let json = await Api.nexon('/mediafire', {
                       url: link
                   });
              if (!json.status) return clips.reply(m.chat, Func.jsonFormat(json), m)
                  let { url, url2, filename, ext, aploud, filesize, filesizeH } = json
                  let text = `⼷  *M E D I A F I R E*\n\n`
                   text += '	◎  *Name* : ' + json.data.filename + '\n'
                   text += '	◎  *Size* : ' + json.data.size + '\n'
                   text += '	◎  *Extension* : ' + json.data.extension + '\n'
                   text += '	◎  *Mime* : ' + json.data.mime + '\n'
                   text += '	◎  *Uploaded* : ' + json.data.uploaded + '\n\n'
                  text += global.footer
                  const chSize = Func.sizeLimit(json.data.size, users.premium ? env.max_upload : env.max_upload_free)
                  const isOver = users.premium ? `💀 File size (${json.data.size}) exceeds the maximum limit, download it by yourself via this link : ${await (await Scrape.shorten(json.data.url).data)}` : `⚠️ File size (${json.data.size}), you can only download files with a maximum size of ${env.max_upload_free} MB and for premium users a maximum of ${env.max_upload} MB.`
                  if (chSize.oversize) return clips.reply(m.chat, isOver, m)
                  clips.sendMessageModify(m.chat, text, m, {
                     largeThumb: true,
                     thumbnail: 'https://telegra.ph/file/fcf56d646aa059af84126.jpg'
                  }).then(async () => {
                     clips.sendFile(m.chat, json.data.url, json.data.filename, '', m)
                  })
               })
            }
         }
      } catch (e) {
         return clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   limit: true,
   download: true
}
