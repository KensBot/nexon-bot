exports.run = {
   noxious: ['autoread', 'oleft', 'owelcome'],
   use: 'on / off',
   category: 'owner',
   async: async (m, {
      clips,
      args,
      isPrefix,
      command
   }) => {
      let setting = global.db.groups.find(v => v.jid == m.chat)
      if (!args || !args[0]) return clips.reply(m.chat, `*Status terkini* : [ ${setting[type] ? 'ON' : 'OFF'} ]`, m)
      let option = args[0].toLowerCase()
      let optionList = ['on', 'off']
      if (!optionList.includes(option)) return clips.reply(m.chat, `*Status terkini* : [ ${setting[type] ? 'ON' : 'OFF'} ]`, m)
      let status = option != 'on' ? false : true
      if (setting[type] == status) return clips.reply(m.chat, Func.texted('bold', `${Func.ucword(command)} telah ${option == 'on' ? 'diaktifkan' : 'dinonaktifkan'} sebelumnya.`), m)
      setting[type] = status
      clips.reply(m.chat, Func.texted('bold', `${Func.ucword(command)} berhasil ${option == 'on' ? 'diaktifkan' : 'dinonaktifkan'}.`), m)
   },
   group: true,
   owner: true,
   cache: true,
   location: __filename
}