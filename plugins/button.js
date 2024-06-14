exports.run = {
   noxious: ['button'],
   async: async (m, {
      clips,
      isPrefix,
      command
   }) => {
      try {
         const buttons = [{
            name: 'quick_reply',
            buttonParamsJson: JSON.stringify({
               display_text: 'Runtime',
               id: `${isPrefix}run`
            })
         }, {
            name: 'single_select',
            buttonParamsJson: JSON.stringify({
               title: 'Tap Here!',
               sections: [{
                  rows: [{
                     title: 'Menu List',
                     // description: `X`,
                     id: `${isPrefix}menu`
                  }, {
                     title: 'All menu',
                     // description: `Y`,
                     id: `${isPrefix}allmenu`
                  }]
               }]
            })
         }]
         // Function Button By Sending Image
         clips.sendIAMessages(m.chat, buttons, m, {
            header: '',
            content: 'Hi!',
            footer: global.footer,
            image: global.db.setting.cover
         })
         /* Function Button By Sending Video Media
         
         clips.sendVIMessages(m.chat, buttons, m, {
            header: '', // Title
            content: 'Hi!', // Message
            footer: global.footer, // Watermark 
            video: global.db.setting.cover // Video Link
         })
         
         // Function Button By Sending Text Only
         clips.sendNMessages(m.chat, buttons, m, {
            header: '', // Title
            content: 'Hi!', // Message
            footer: global.footer, // Watermark 
         })
         
         // Function Button By Sending Document Photo
         clips.sendDocMessages(m.chat, buttons, m, {
            header: '', // Title
            content: 'Hi!', // Message
            footer: global.footer, // Watermark 
            title: global.botname, // Title Image
            body: 'By nexon-prime', // Body Image
            thumbnail: global.db.setting.cover, // url image
            url: 'https://info.nexon.my.id', // body url image
            titleDoc: 'nexonn', // title document
            urlDoc: 'https://info.nexon.my.id', // url document
            thumb: global.db.setting.cover // thumbnail document photo
         })
         
         */
      } catch (e) {
         clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   cache: true,
   location: __filename
}