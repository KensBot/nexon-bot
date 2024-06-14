exports.run = {
   noxious: ['autodownload', 'groupmode', 'multiprefix', 'online', 'limiter', 'noprefix', 'self'],
   use: 'on / off',
   category: 'owner',
   async: async (m, {
      clips,
      args,
      isPrefix,
      command
   }) => {
      let system = global.db.setting
      let buttons = [{
            name: 'single_select',
            buttonParamsJson: JSON.stringify({
               title: 'Tap Here!',
               sections: [{
                  rows: [{
                      title: Func.ucword(command),
                      description: `[ Status : ON ]`,
                      id: `${isPrefix + command} on`
                  }, {
                      title: Func.ucword(command),
                      description: `[ Status : OFF ]`,
                      id: `${isPrefix + command} off`
                  }]
              }]
          })
      }]
      let type = command.toLowerCase()
      if (!args || !args[0]) return clips.sendNMessages(m.chat, buttons, m, {
            header: global.botname,
            content: `🚩 *Current status* : [ ${system[type] ? 'ON' : 'OFF'} ]`,
            footer: global.footer
         })
      let option = args[0].toLowerCase()
      let optionList = ['on', 'off']
      if (!optionList.includes(option)) return clips.sendNMessage(m.chat, buttons, m, {
            header: global.botname,
            content: `🚩 *Current status* : [ ${system[type] ? 'ON' : 'OFF'} ]`,
            footer: global.footer
         })
      let status = option != 'on' ? false : true
      if (system[type] == status) return clips.reply(m.chat, Func.texted('bold', `${Func.ucword(command)} telah ${option == 'on' ? 'diaktifkan' : 'dinonaktifkan'} sebelumnya.`), m)
      system[type] = status
      clips.reply(m.chat, Func.texted('bold', `${Func.ucword(command)} berhasil ${option == 'on' ? 'diaktifkan' : 'dinonaktifkan'}.`), m)
   },
   owner: true,
   cache: true,
   location: __filename
}
