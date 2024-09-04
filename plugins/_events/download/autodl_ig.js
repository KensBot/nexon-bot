exports.run = {
   regex: /^(?:https?:\/\/)?(?:www\.)?(?:instagram\.com\/)(?:tv\/|p\/|reel\/)(?:\S+)?$/,
   async: async (m, {
      clips,
      body,
      users,
      setting
   }) => {
      try {
         const regex = /^(?:https?:\/\/)?(?:www\.)?(?:instagram\.com\/)(?:tv\/|p\/|reel\/)(?:\S+)?$/;
         const extract = body ? Func.generateLink(body) : null
         if (extract) {
            const links = extract.filter(v => Func.igFixed(v).match(regex))
            if (links.length != 0) {
               if (users.limit > 0) {
                  let limit = 1
                  if (users.limit >= limit) {
                     users.limit -= limit
                  } else return clips.reply(m.chat, Func.texted('bold', `🚩 Your limit is not enough to use this feature.`), m)
               }
               clips.sendReact(m.chat, '🕒', m.key)
               let old = new Date()
               Func.hitstat('ig', m.sender)
               links.map(async link => {
               let json = await Api.nexon('/instagram', {
                       url: Func.igFixed(link)
                   });
              if (!json.status) return clips.reply(m.chat, Func.jsonFormat(json), m)
                   for (let v of json.data) {
                      clips.sendFile(m.chat, v.url, v.type == 'mp4' ? Func.filename('mp4') : Func.filename('jpg'), `🍟 *Fetching* : ${((new Date - old) * 1)} ms`, m)
                      await Func.delay(1500)
                   }
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