exports.run = {
   noxious: ['glitchtext', 'writetext', 'advancedglow', 'typographytext', 'pixelglitch', 'neonglitch', 'flagtext', 'flag3dtext', 'deletingtext', 'blackpinkstyle', 'glowingtext', 'underwatertext', 'logomaker', 'cartoonstyle', 'papercutstyle', 'watercolortext', 'effectclouds', 'blackpinklogo',  'gradienttext', 'summerbeach', 'luxurygold', 'multicoloredneon', 'sandsummer', 'galaxywallpaper', '1917style', 'makingneon', 'royaltext', 'freecreate', 'galaxystyle', 'lighteffects'],
   use: 'text',
   category: 'text maker',
   async: async (m, {
      clips, 
      text, 
      isPrefix, 
      command 
   }) => {
      try {
     if (!text) return clips.reply(m.chat, Func.example(isPrefix, command, 'Hi'), m)
	  clips.sendReact(m.chat, '🕒', m.key)
	
      let json = await Api.nexon('/textmaker/v1', {
                      id: command, 
                      q: text
                  })
      clips.sendFile(m.chat, json, 'image.jpg', '', m)
      } catch (e) {
         return clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}