exports.run = {
   noxious: ['polling'],
   async: async (m, {
      clips,
      isPrefix,
      command
   }) => {
         clips.sendPoll(m.chat, "Hi!", {
            options: ["Menu", "Allmenu", "Runtime"],
            multislect: false
         })
   },
   error: false,
   cache: true,
   location: __filename
}