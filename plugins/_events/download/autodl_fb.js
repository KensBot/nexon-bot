exports.run = {
   regex: /^(?:https?:\/\/(web\.|www\.|m\.)?(facebook|fb)\.(com|watch)\S+)?$/,
   async: async (m, {
      clips,
      body,
      users,
      setting
   }) => {
      try {
         const regex = /^(?:https?:\/\/(web\.|www\.|m\.)?(facebook|fb)\.(com|watch)\S+)?$/;
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
               Func.hitstat('fb', m.sender)
               links.map(async link => {
                  let json = await Api.nexon('/facebook', {
                       url: link
                   });
                  if (!json.status) return clips.reply(m.chat, Func.jsonFormat(json), m)
                  let result = json.data.find(v => v.type == 'HD' && v.response == 200)
               if (result) {
                   clips.sendFile(m.chat, result.url, Func.filename('mp4'), `◎ *Quality* : HD`, m)
             } else {
                  let result = json.data.find(v => v.type == 'SD' && v.response == 200)
                  if (!result) return clips.reply(m.chat, global.status.fail, m)
                  clips.sendFile(m.chat, result.url, Func.filename('mp4'), `◎ *Quality* : SD`, m)
                     }
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
