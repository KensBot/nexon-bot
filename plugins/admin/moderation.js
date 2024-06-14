exports.run = {
   noxious: ['antidelete', 'antilink', 'left', 'filter', 'localonly', 'welcome'],
   use: 'on / off',
   category: 'admin',
   async: async (m, {
      clips,
      args,
      isPrefix,
      command,
      isBotAdmin
   }) => {
      let setting = global.db.groups.find(v => v.jid == m.chat)
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
      if (!isBotAdmin && /antiporn|captcha|antibot|antilink|antivirtex|filter|localonly/.test(type)) return clips.reply(m.chat, global.status.botAdmin, m)
      if (!args || !args[0]) return clips.sendNMessages(m.chat, buttons, m, {
            header: global.botname,
            content: `🚩 *Current status* : [ ${setting[type] ? 'ON' : 'OFF'} ]`,
            footer: global.footer
         })
      let option = args[0].toLowerCase()
      let optionList = ['on', 'off']
      if (!optionList.includes(option)) return clips.sendNMessages(m.chat, buttons, m, {
            header: global.botname,
            content: `🚩 *Current status* : [ ${setting[type] ? 'ON' : 'OFF'} ]`,
            footer: global.footer
         })
      let status = option != 'on' ? false : true
      if (setting[type] == status) return clips.reply(m.chat, Func.texted('bold', `🚩 ${Func.ucword(command)} has been ${option == 'on' ? 'activated' : 'inactivated'} previously.`), m)
      setting[type] = status
      clips.reply(m.chat, Func.texted('bold', `🚩 ${Func.ucword(command)} has been ${option == 'on' ? 'activated' : 'inactivated'} successfully.`), m)
   },
   admin: true,
   group: true,
   cache: true,
   location: __filename
}