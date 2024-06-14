exports.run = {
   noxious: ['hidetag', 'hidecall'],
   use: 'text',
   category: 'admin',
   async: async (m, {
      clips,
      text,
      isPrefix,
      command,
      participants
   }) => {
      if (!text) return clips.reply(m.chat, Func.example(isPrefix, command, 'name'), m)
      if (command == 'hidetag') {
      let users = participants.map(u => u.id)
      await clips.reply(m.chat, text, null, {mentions: users})
      } else if (command == 'hidecall') {
      if (!text) return clips.reply(m.chat, Func.example(isPrefix, command, 'name'), m)
      clips.relayMessage(m.chat, {
      scheduledCallCreationMessage: {
      callType: "VIDEO", 
      scheduledTimestampMs: Date.now(), 
      title: text ? text : 'Hii Bro' 
      }}, {})     	
     }     	     
   },
   admin: true,
   group: true
}