const fs = require('fs');

exports.run = {
   noxious: ['owner'],
   category: 'about',
   async: async (m, {
      clips,
      text,
      args,
      isPrefix,
      command
   }) => {
   try {  
   const FakeLoc = {
      key: {
         fromMe: false,
         participant: `0@s.whatsapp.net`,
         ...(m.sender ? {
            remoteJid: 'status@broadcast'
         } : {})
      },
      message: {
         "imageMessage": {
            "mimetype": "image/jpeg",
            "caption": global.bot_name + " WhatsApp Bot",
            "jpegThumbnail": await Func.createThumb(await fs.readFileSync(`./media/image/kens.jpg`))
         }
      }
      }
      clips.sendContact(m.chat, [{
         name: global.owner_name,
         number: global.owner,
         about: 'Owner & Creator'
      }], FakeLoc, {
         org: 'Kens Network',
         website: 'https://api.kens.my.id',
         email: 'contact@kens.my.id'
      })
     } catch (e) {
    return clips.reply(m.chat, Func.jsonFormat(e))
    }
},
error: false
}
