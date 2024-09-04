const category = ['anak', 'jawa', 'sunda', 'budaya', 'cinta', 'galau', 'gokil', 'inspiratif', 'jepang', 'kehidupan', 'keluarga', 'korea', 'kristen', 'liburan', 'lingkungan', 'malaysia', 'mengharukan', 'misteri', 'motivasi', 'nasihat', 'nasionalisme', 'olahraga', 'penantian', 'pendidikan', 'pengorbanan', 'penyesalan', 'perjuangan', 'perpisahan', 'persahabatan', 'petualangan', 'ramadhan', 'remaja', 'renungan', 'rindu', 'rohani', 'romantis', 'sastra', 'sedih', 'sejarah', 'terjemahan']
exports.run = {
   noxious: category.map(v => `cerpen-${v}`),
   category: 'e-perpus',
   async: async (m, {
      clips,
      command
   }) => {
      try {
         clips.sendReact(m.chat, '🕒', m.key)
         const json = await Api.nexon('/cerpen', {
                          q: command.split`-` [1].trim()
                      })
         let text = `*${json.data.title.toUpperCase()}*\n`
         text += `*BY* ${json.data.author}\n`
         text += `${json.data.lolos}\n`
         text += `${json.data.kategori}\n\n`
         text += json.data.cerita
         clips.sendMessageModify(m.chat, text, m, {largeThumb: true, thumbnail: await Func.fetchBuffer('https://iili.io/JFmOPIV.jpg')})  
      } catch (e) {
         clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   limit: true
}