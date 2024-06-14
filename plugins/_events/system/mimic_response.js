exports.run = {
   async: async (m, {
      clips,
      users,
      setting
   }) => {
      try {
         if (setting.mimic.includes(m.sender) && !users.banned && (new Date - users.banTemp > 1800000)) {
            clips.copyNForward(m.chat, m, {
               quoted: m.quoted ? m.quoted.fakeObj : null
            })
         }
      } catch (e) {
         console.log(e)
         return clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   cache: true,
   location: __filename
}