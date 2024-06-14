exports.run = {
   noxious: ['setmenu'],
   use: '(option)',
   category: 'owner',
   async: async (m, {
      clips,
      args,
      isPrefix,
      command
   }) => {
      try {
      let teks = `• *Example* : ${isPrefix + command} 1\n\n`
      teks += `⼷  *L I S T - M E N U*\n\n`
      teks += `  ◉ ${isPrefix + command} 1\n  - type ( 乂 )\n  - type body ( ◉ )\n  - type Font ( Biasa )\n  - type Link Group ( √ )\n\n`
      teks += `  ◉ ${isPrefix + command} 2\n  - type ( 乂 )\n  - type body ( ◉ )\n  - type Font ( ${Func.Styles('styles')} )\n  - type Link Group ( √ )\n\n`
      teks += `  ◉ ${isPrefix + command} 3\n  - type ( 乂 )\n  - type body ( ◉ )\n  - type Font ( Biasa )\n  - type Link Group ( × )\n\n`
      teks += `  ◉ ${isPrefix + command} 4\n  - type ( ム )\n  - type body ( ◉ )\n  - type Font ( Biasa )\n  - type Link Group ( √ )\n\n`
      teks += `  ◉ ${isPrefix + command} 5\n  - type ( ム )\n  - type body ( ◉ )\n  - type Font ( ${Func.Styles('styles')} )\n  - type Link Group ( √ )\n\n`
      teks += `  ◉ ${isPrefix + command} 6\n  - type ( ム )\n  - type body ( ◉ )\n  - type Font ( Biasa )\n  - type Link Group ( × )\n\n`
      teks += `  ◉ ${isPrefix + command} 7\n  - type ( ム )\n  - type body ( ⊹ )\n  - type Font ( Biasa )\n  - type Link Group ( √ )\n\n`
      teks += `  ◉ ${isPrefix + command} 8\n  - type ( ム )\n  - type body ( ⊹ )\n  - type Font ( ${Func.Styles('styles')} )\n  - type Link Group ( √ )\n\n`
      teks += `  ◉ ${isPrefix + command} 9\n  - type ( ム )\n  - type body ( ⊹ )\n  - type Font ( Biasa )\n  - type Link Group ( × )\n\n`
      teks += `  ◉ ${isPrefix + command} 10\n  - type ( – )\n  - type body ( ┌ ◉ "-" │ ◉ "-" └  ◉ )\n  - type Font ( Biasa )\n  - type Link Group ( √ )\n\n`
      teks += `  ◉ ${isPrefix + command} 11\n  - type ( – )\n  - type body ( ┌ ◉ "-" │ ◉ "-" └  ◉ )\n  - type Font ( ${Func.Styles('styles')} )\n  - type Link Group ( √ )\n\n`
      teks += `  ◉ ${isPrefix + command} 12\n  - type ( – )\n  - type body ( ┌ ◉ "-" │ ◉ "-" └  ◉ )\n  - type Font ( Biasa )\n  - type Link Group ( × )\n\n`
      teks += `  ◉ ${isPrefix + command} 13\n  - type ( – )\n  - type body ( ┌ ◉ "-" │ ◉ "-" └  ◉ )\n  - type Font ( Biasa )\n  - type Link Group ( √ )\n  - type menu terpisah\n\n`
      teks += `  ◉ ${isPrefix + command} 14\n  - type ( – )\n  - type body ( ┌ ◉ "-" │ ◉ "-" └  ◉ )\n  - type Font ( Biasa )\n  - type Link Channel ( √ )\n  - type menu terpisah\n\n`
      teks += global.footer + '  '
         let setting = global.db.setting
         if (!args || !args[0]) {
            clips.reply(m.chat, teks, m)
         } else {
            clips.sendMessageModify(m.chat, `Menu bot berhasil disetel menggunakan style *${args[0]}*.`, m, {
            largeThumb: true,
            thumbnail: 'https://telegra.ph/file/a776ddaf7bed1e3eb627b.jpg'}).then(() => setting.menuStyle = parseInt(args[0]))
         }
      } catch (e) {
         console.log(e)
         return clips.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   owner: true
}