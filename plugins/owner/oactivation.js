exports.run = {
   noxious: ['omute'],
   use: '0 / 1',
   category: 'owner',
   async: async (m, {
      clips,
      args,
      isPrefix,
      command
   }) => {
      let gc = global.db.groups.find(v => v.jid == m.chat)
      let opt = [0, 1]
      let buttons = [{
            name: 'single_select',
            buttonParamsJson: JSON.stringify({
               title: 'Tap Here!',
               sections: [{
                  rows: [{
                      title: Func.ucword(command),
                      description: `[ Status : ON ]`,
                      id: `${isPrefix + command} 1`
                  }, {
                      title: Func.ucword(command),
                      description: `[ Status : OFF ]`,
                      id: `${isPrefix + command} 0`
                  }]
              }]
          })
      }]
      if (!args || !args[0] || !opt.includes(parseInt(args[0]))) return clips.sendNMessages(m.chat, buttons, m, {
            header: global.botname,
            content: `🚩 *Current status* : [ ${gc.mute ? 'True' : 'False'} ]`,
            footer: global.footer
         })
      if (parseInt(args[0]) == 1) {
         if (gc.mute) return clips.reply(m.chat, Func.texted('bold', `🚩 Previously muted.`), m)
         gc.mute = true
         clips.reply(m.chat, Func.texted('bold', `🚩 Successfully muted.`), m)
      } else if (parseInt(args[0]) == 0) {
         if (!gc.mute) return clips.reply(m.chat, Func.texted('bold', `🚩 Previously unmuted.`), m)
         gc.mute = false
         clips.reply(m.chat, Func.texted('bold', `🚩 Successfully unmuted.`), m)
      }
   },
   owner: true,
   group: true,
   cache: true,
   location: __filename
}