const { execSync } = require('child_process')
exports.run = {
   noxious: ['update'],
   hidden: ['upt'],
   category: 'owner',
   async: async (m, {
      clips
   }) => {
      try {
         var stdout = execSync('git pull')
         var output = stdout.toString()
         if (output.match(new RegExp('Already up to date', 'g'))) return clips.reply(m.chat, Func.texted('bold', `🚩 ${output.trim()}`), m)
         if (output.match(/stash/g)) {
            var stdout = execSync('git stash && git pull')
            var output = stdout.toString()
            clips.reply(m.chat, `🚩 ${output.trim()}`, m).then(async () => {
               await props.save()
               process.send('reset')
            })
         } else return clips.reply(m.chat, `🚩 ${output.trim()}`, m).then(async () => {
            await props.save()
            process.send('reset')
         })
      } catch (e) {
         return clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   owner: true,
   cache: true,
   location: __filename
}