exports.run = {
  noxious: ['blue', 'blurple', 'blurple2', 'green', 'greyscale', 'invertgrayscale', 'red', 'sepia', 'threshold'],
  use: "reply image",
  category: "effects",
  async: async (m, { 
    clips, 
    text, 
    isPrefix, 
    command 
  }) => {
    try {
        let q = m.quoted ? m.quoted : m

         let mime = ((m.quoted ? m.quoted : m.msg).mimetype || '')

         if (/image\/(jpe?g|png)/.test(mime)) {
      clips.sendReact(m.chat, '🕒', m.key)

          let img = await q.download()
          let json = await Scrape.uploadImageV2(img);
             
          let jawab = `${json.data.url}`
          let res = await Api.nexon('/image-effect/v1', {
                         id: command, 
                         url: jawab
                   })
          clips.sendFile(m.chat, res.data.img, "", "", m);
        } else {
          clips.reply(m.chat, Func.texted("bold", "Hanya untuk foto"), m);
        }
      
    } catch (e) {
      return clips.reply(m.chat, Func.jsonFormat(e), m);
    }
  },
  error: false,
  limit: true,
  premium: true,
};