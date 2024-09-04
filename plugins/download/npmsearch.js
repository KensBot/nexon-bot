exports.run = {
  noxious: ['npmsearch'],
  hidden: ['npm', 'npms'],
  use: 'query',
  category: 'others',
  async: async (m, { 
    clips,
    args,
    isPrefix,
    command 
  }) => {
    try {
         if (!args || !args[0]) return clips.reply(m.chat, Func.example(isPrefix, command, 'queue'), m)
          const json = await Api.nexon('/npm-search', {
                           q: args[0]
                      })
         let old = new Date()
         if (!json.status || !json.data) return clips.reply(m.chat, Func.jsonFormat(json), m)
         let caption = `⼷  *N P M - S E AR C H*\n\n`
         json.data.map((v, i) => {
             caption += `*${i+1}*. ${v.name}\n`
             caption += `◎ *Author* : ${v.author}\n`
             caption += `◎ *Name* : ${v.name}\n`
             caption += `◎ *Version* : ${v.version}\n`
             caption += `◎ *Description* : ${v.description}\n`
             if (v.keywords) caption += `◎ *Keywords* : ${v.keywords.join(', ')}\n`
             caption += `◎ *Upload* : ${v.upload}\n`
             caption += `◎ *Npm* : ${v.link.npm}\n`
             caption += `◎ *Link* :\n`
             caption += `- *Homepage* : ${v.link.homepage ? v.link.homepage : '-'}\n`
             caption += `- *Repository* : ${v.link.repository ? v.link.repository : '-'}\n`
             caption += `- *Bugs* : ${v.link.bugs ? v.link.bugs : '-'}\n`
             caption += `*Fetching* : ${((new Date - old) * 1)} ms\n\n`
         }).join('\n\n')
         clips.sendMessageModify(m.chat, caption + global.footer, m, {
               largeThumb: true,
               thumbnail: await Func.fetchBuffer('https://telegra.ph/file/9aab1b0e6f4fbed787276.jpg')
         })
      } catch (e) {
         return clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}