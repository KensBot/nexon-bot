const { writeFileSync: create, readFileSync: read }= require('fs')
exports.run = {
   noxious: ['backup'],
   category: 'owner',
   async: async (m, {
      clips,
      command
   }) => {
      try {
         await props.save()
         create('./database.json', JSON.stringify(global.db, null, 3), 'utf-8')
         clips.reply(m.chat, global.status.wait, m)
         await clips.sendFile(m.chat, read('./database.json'), 'database.json', '', m)
      } catch (e) {
         return clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   owner: true,
   cache: true,
   location: __filename
}