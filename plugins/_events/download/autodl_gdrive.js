exports.run = {
   regex: /^(?:https?:\/\/)?(?:drive\.)?(?:google\.com\/)(?:\S+)?$/,
   async: async (m, {
      clips,
      body,
      users,
      setting
   }) => {
      try {
         const regex = /^(?:https?:\/\/)?(?:drive\.)?(?:google\.com\/)(?:\S+)?$/;
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
               Func.hitstat('gdrive', m.sender)
               links.map(async link => {
               let json = await Api.nexon('/gdrive', {
                       url: link
                   });
              if (!json.status) return clips.reply(m.chat, Func.jsonFormat(json), m)
	          let text = `⼷  *G D R I V E - D L*\n\n`
		      text += `  ◎ *Name* : ${json.data.fileName}\n`
		      text += `  ◎ *Size* : ${json.data.fileSize}\n`
		      text += `  ◎ *Link* : ${json.data.downloadUrl}\n\n`
		      text += global.footer
		      const chSize = Func.sizeLimit(json.data.fileSize, users.premium ? global.max_upload : global.max_upload_free)
              const isOver = users.premium ? `💀 File size (${fileSize}) exceeds the maximum limit, download it by yourself via this link : ${await (await Scrape.shorten(json.data.downloadUrl).data)}` : `⚠️ File size (${fileSize}), you can only download files with a maximum size of ${global.max_upload_free} MB and for premium users a maximum of ${global.max_upload} MB.`
              if (chSize.oversize) return clips.reply(m.chat, isOver, m)
              clips.sendMessageModify(m.chat, text, m, {
                  largeThumb: true,
                  thumbnail: 'https://iili.io/J58ERt4.jpg'
               }).then(async () => {
                  clips.sendFile(m.chat, json.data.downloadUrl, json.data.fileName, null, '', m)
                  })
	           })
            }
         }
      } catch (e) {
          clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   limit: true,
   download: true
}