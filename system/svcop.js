module.exports = (m) => {
   const isNumber = x => typeof x === 'number' && !isNaN(x)
   let user = global.db.users.find(v => v.jid == m.sender)
   if (user) {
      if (!('name' in user)) user.name = m.pushName
      if (!isNumber(user.afk)) user.afk = -1
      if (!('afkReason' in user)) user.afkReason = ''
      if (!('afkObj' in user)) user.afkObj = {}
      if (!('banned' in user)) user.banned = false
      if (!isNumber(user.banTemp)) user.banTemp = 0
      if (!isNumber(user.banTimes)) user.banTimes = 0
      if (!isNumber(user.point)) user.point = 0
      if (!isNumber(user.guard)) user.guard = 0
      if (!isNumber(user.limit)) user.limit = env.limit
      if (!('premium' in user)) user.premium = false
      if (!isNumber(user.expired)) user.expired = 0
      if (!isNumber(user.lastseen)) user.lastseen = 0
      if (!isNumber(user.hit)) user.hit = 0
      if (!isNumber(user.spam)) user.spam = 0
      if (!isNumber(user.warning)) user.warning = 0
      if (!isNumber(user.attempt)) user.attempt = 0
      if (!('partner' in user)) user.partner = ''
      if (!('taken' in user)) user.taken = false
      if (!('authentication' in user)) user.authentication = false
   } else {
      global.db.users.push({
         jid: m.sender,
         name: m.pushName,
         afkReason: '',
         afkObj: {},
         banned: false,
         banTemp: 0,
         banTimes: 0,
         point: 0,
         guard: 0,
         limit: env.limit,
         premium: false,
         expired: 0,
         lastseen: 0,
         hit: 0,
         spam: 0,
         warning: 0,
         attempt: 0,
         taken: false,
         partner: '',
         authentication: false
      })
   }

   if (m.isGroup) {
      let group = global.db.groups.find(v => v.jid == m.chat)
      if (group) {
         if (!isNumber(group.activity)) group.activity = 0
         if (!('autoread' in group)) group.autoread = true
         if (!('antidelete' in group)) group.antidelete = false
         if (!('antilink' in group)) group.antilink = true
         if (!('antivirtex' in group)) group.antivirtex = true 
         if (!('filter' in group)) group.filter = false
         if (!('left' in group)) group.left = true
         if (!('localonly' in group)) group.localonly = false
         if (!('mute' in group)) group.mute = false
         if (!('member' in group)) group.member = {}
         if (!('text_left' in group)) group.text_left = ''
         if (!('text_welcome' in group)) group.text_welcome = ''
         if (!('welcome' in group)) group.welcome = true
         if (!isNumber(group.expired)) group.expired = 0
         if (!('stay' in group)) group.stay = false
      } else {
         global.db.groups.push({
            jid: m.chat,
            activity: 0,
            autoread: true,
            antidelete: false,
            antilink: true,
            antivirtex: true,
            filter: false,
            left: true,
            localonly: false,
            mute: false,
            member: {},
            text_left: '',
            text_welcome: '',
            welcome: true,
            expired: 0,
            stay: false
         })
      }
   }

   let chat = global.db.chats.find(v => v.jid == m.chat)
   if (chat) {
      if (!isNumber(chat.chat)) chat.chat = 0
      if (!isNumber(chat.lastchat)) chat.lastchat = 0
      if (!isNumber(chat.lastseen)) chat.lastseen = 0
      if (!isNumber(chat.command)) chat.command = 0
   } else {
      global.db.chats.push({
         jid: m.chat,
         chat: 0,
         lastchat: 0,
         lastseen: 0,
         command: 0
      })
   }

   let setting = global.db.setting
   if (setting) {
  	  if (!('autodownload' in setting)) setting.autodownload = true
      if (!('antispam' in setting)) setting.antispam = true
  	  if (!('debug' in setting)) setting.debug = false
      if (!('levelup' in setting)) setting.levelup= true
      if (!('error' in setting)) setting.error = []
      if (!('pluginDisable' in setting)) setting.pluginDisable = []
      if (!('pluginVerified' in setting)) setting.pluginVerified = []
      if (!('groupmode' in setting)) setting.groupmode = false
      if (!('sk_pack' in setting)) setting.sk_pack = 'nexon-bot'
      if (!('sk_author' in setting)) setting.sk_author = '© kens.js'
      if (!('self' in setting)) setting.self = false
      if (!('mimic' in setting)) setting.mimic = []
      if (!('hidden' in setting)) setting.hidden = []
      if (!('limiter' in setting)) setting.limiter = true
      if (!('noprefix' in setting)) setting.noprefix = true
      if (!('multiprefix' in setting)) setting.multiprefix = true
      if (!('prefix' in setting)) setting.prefix = ['.', '/', '!', '#']
      if (!('toxic' in setting)) setting.toxic = ["ajg", "ajig", "anjas", "anjg", "anjim", "anjing", "anjrot", "anying", "asw", "autis", "babi", "bacod", "bacot", "bagong", "bajingan", "bangsad", "bangsat", "bastard", "bego", "bgsd", "biadab", "biadap", "bitch", "bngst", "bodoh", "bokep", "cocote", "coli", "colmek", "comli", "dajjal", "dancok", "dongo", "fuck", "gelay", "goblog", "goblok", "guoblog", "guoblok", "hairul", "henceut", "idiot", "itil", "jamet", "jancok", "jembut", "jingan", "kafir", "kanjut", "kanyut", "keparat", "kntl", "kontol", "lana", "loli", "lont", "lonte", "mancing", "meki", "memek", "ngentod", "ngentot", "ngewe", "ngocok", "ngtd", "njeng", "njing", "njinx", "oppai", "pantek", "pantek", "peler", "pepek", "pilat", "pler", "pornhub", "pucek", "puki", "pukimak", "redhub", "sange", "setan", "silit", "telaso", "tempek", "tete", "titit", "toket", "tolol", "tomlol", "tytyd", "xnxx"]
      if (!('online' in setting)) setting.online = true
      if (!('onlyprefix' in setting)) setting.onlyprefix = '+'
      if (!('owners' in setting)) setting.owners = ['628888375863']
      if (!('mods' in setting)) setting.mods = ['628888375863']
      if (!isNumber(setting.lastReset)) setting.lastReset = new Date * 1
      if (!('msg' in setting)) setting.msg = 'Hi +tag 🪸\n*+greetingV2*\n\n  ⁃ *Database* : +db\n  ⁃ *Library* : Baileys v+versi\n  ⁃ *Website* : https://info.nexon.my.id\n\nIf you find an error or want to upgrade premium plan or want rent bot contact the owner.'
      if (!isNumber(setting.menuStyle)) setting.menuStyle = 5
      if (!('cover' in setting)) setting.cover = 'https://iili.io/JTR9IOg.jpg'
      if (!('link' in setting)) setting.link = 'https://chat.whatsapp.com/I3PoXJ878NMKYcPOejAUAV'
   } else {
      global.db.setting = {
         autodownload: true,
         antispam: true,
         debug: false,
         levelup: true,
         error: [],
         pluginDisable: [],
         pluginVerified: [],
         groupmode: false,
         sk_pack: 'nexon-bot',
         sk_author: '© kens.js',
         self: false,
         mimic: [],
         hidden: [],
         limiter: true,
         noprefix: true,
         multiprefix: true,
         prefix: ['.', '#', '!', '/'],
         toxic: ["ajg", "ajig", "anjas", "anjg", "anjim", "anjing", "anjrot", "anying", "asw", "autis", "babi", "bacod", "bacot", "bagong", "bajingan", "bangsad", "bangsat", "bastard", "bego", "bgsd", "biadab", "biadap", "bitch", "bngst", "bodoh", "bokep", "cocote", "coli", "colmek", "comli", "dajjal", "dancok", "dongo", "fuck", "gelay", "goblog", "goblok", "guoblog", "guoblok", "hairul", "henceut", "idiot", "itil", "jamet", "jancok", "jembut", "jingan", "kafir", "kanjut", "kanyut", "keparat", "kntl", "kontol", "lana", "loli", "lont", "lonte", "mancing", "meki", "memek", "ngentod", "ngentot", "ngewe", "ngocok", "ngtd", "njeng", "njing", "njinx", "oppai", "pantek", "pantek", "peler", "pepek", "pilat", "pler", "pornhub", "pucek", "puki", "pukimak", "redhub", "sange", "setan", "silit", "telaso", "tempek", "tete", "titit", "toket", "tolol", "tomlol", "tytyd", "xnxx"],
         online: true,
         onlyprefix: '+',
         owners: ['628888375863'],
         mods: ['628888375863'],
         lastReset: new Date * 1,
         msg: 'Hi +tag 🪸\n*+greetingV2*\n\n  ⁃ *Database* : +db\n  ⁃ *Library* : Baileys v+versi\n  ⁃ *Website* : https://info.nexon.my.id\n\nIf you find an error or want to upgrade premium plan or want rent bot contact the owner.',
         menuStyle: 5,
         cover: 'https://iili.io/J7Oajus.jpg',
         link: 'https://chat.whatsapp.com/I3PoXJ878NMKYcPOejAUAV'
      }
   }
}