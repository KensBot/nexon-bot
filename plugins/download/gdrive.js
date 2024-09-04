exports.run = {
   noxious: ['googledrive'],
   hidden: ['gdrive'],
   use: 'link',
   category: 'downloader',
   async: async (m, {
      clips,
      args,
      text,
      isPrefix,
      command,
      users
   }) => {
  try {
	if (!args[0]) return m.reply(Func.example(isPrefix, command, 'https://drive.google.com/file/d/1ZYWgQUvjHtADg1HoAdQ0aSKboG2t0rO0/view?usp=drivesdk'))
	await clips.sendReact(m.chat, '🕒', m.key)
	let json = await Api.nexon('/gdrive', {
	               url: args[0]
	           })
	if (!json.status) return m.reply(Func.jsonFormat(json.status))
	let text = `⼷  *G D R I V E - D L*\n\n`
	text += `  ◎ *Name* : ${json.data.fileName}\n`
	text += `  ◎ *Size* : ${json.data.fileSize}\n`
	text += `  ◎ *Link* : ${json.data.downloadUrl}\n\n`
	text += global.footer
	const chSize = Func.sizeLimit(json.datafileSize, users.premium ? env.max_upload : env.max_upload_free)
	const isOver = users.premium ? `💀 File size (${json.datafileSize}) exceeds the maximum limit, download it by yourself via this link : ${await (await Scrape.shorten(json.data.downloadUrl).data)}` : `⚠️ File size (${json.data.fileSize}), you can only download files with a maximum size of ${env.max_upload_free} MB and for premium users a maximum of ${env.max_upload} MB.`
	if (chSize.oversize) return clips.reply(m.chat, isOver, m)
	 clips.sendMessageModify(m.chat, text, m, {
          largeThumb: true,
          thumbnail: 'https://iili.io/J58ERt4.jpg'
         }).then(async () => {
       clips.sendFile(m.chat, json.data.downloadUrl, json.data.fileName, null, '', m)
         })
     } catch (e) {
       return clips.reply(m.chat, global.status.error, m)
  }
},
error: false,
limit: true
}