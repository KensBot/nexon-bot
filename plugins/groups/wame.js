exports.run = {
   noxious: ['wame'],
   category: 'group',
   async: async (m, {
      clips,
      text
   }) => {
      let number = m.quoted ? (m.quoted.sender).split`@` [0] : (m.sender).split`@` [0]
      let chat = text ? text : 'hai'
      clips.reply(m.chat, `https://wa.me/${number}?text=${encodeURI(chat)}`, m)
   },
   error: false
}