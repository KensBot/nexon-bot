exports.run = {
   noxious: ['topup-dana', 'topup-ovo', 'topup-gopay'],
   hidden: ['confirm', 'cancel'],
   use: 'number amount',
   category: 'others',
   async: async (m, {
      clips,
      args,
      isPrefix,
      command
   }) => {
      try {
         global.db.topup = global.db.topup ? global.db.topup : []
         if (command.startsWith('topup-')) {
            const transaction = global.db.topup.some(v => v.jid == m.sender && v.state == 'PENDING')
            if (transaction) return m.reply(Func.texted('bold', `🚩 Selesaikan transaksi sebelumnya atau kirim ${isPrefix}cancel`))
            if (!args || !args[0] || !args[1]) return m.reply(Func.example(isPrefix, command, '085817314691 10000'))
            const json = await Api.nexon(`/topup/${command.split`-`[1]}`, {
                             number: Number(args[0]), 
                             amount: Number(args[1])
                          })
            if (!json.status) return m.reply(Func.jsonFormat(json))
            const id = 'NXN-' + Func.makeId(8)
            let caption = `Faktur “${command.toUpperCase().replace('-', ' ')}“ dengan rincian sebagai berikut :\n\n`
            caption += `◦ *ID* : ${id}\n`
            caption += `◦ *Nomor* : ${json.data.number}\n`
            caption += `◦ *Harga* : ${json.data.price_format}\n`
            caption += `◦ *Kadaluarsa* : ${json.data.expired_at}\n\n`
            caption += `Kirim *${isPrefix}confirm* untuk menkonfirmasi pembayaran dan *${isPrefix}cancel* untuk membatalkan.`
            clips.sendFile(m.chat, Buffer.from(json.data.qr_image, 'base64'), 'qr.png', caption, m).then(() => global.db.topup.push({
               _id: id,
               state: 'PENDING',
               jid: m.sender,
               amount: json.data.price,
               package: command.toUpperCase().replace('-', '_'),
               created_at: new Date * 1,
               receipt: json.data.id,
               code: json.data.code
            }))
         } else if (command === 'cancel') {
            const transaction = global.db.topup.find(v => v.jid == m.sender && v.state == 'PENDING')
            if (!transaction) return
            m.reply(Func.texted('bold', `🚩 Faktur berhasil dibatalkan.`))
            if (transaction) return Func.removeItem(global.db.topup, transaction)
         } else if (command === 'confirm') {
            const transaction = global.db.topup.find(v => v.jid == m.sender && v.state == 'PENDING')
            if (!transaction) return
            const json = await Api.nexon('/topup/confrim', {
                             id: transaction.receipt, 
                             code: transaction.code
                         })
            if (!json.status) return m.reply(Func.jsonFormat(json))
            if (json.data.status != 'PENDING') return m.reply(Func.texted('bold', `✅ ${json.data.status}`)).then(() => transaction.state = 'DONE')
            m.reply(Func.texted('bold', `${json.data.status}`))
         }
      } catch (e) {
         console.log(e)
         clips.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   cache: true,
   location: __filename
}