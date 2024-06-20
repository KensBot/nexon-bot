const cron = require('node-cron')
const fs = require('fs')
const env = require('./system/env.json')
const cache = new(require('node-cache'))({
   stdTTL: env.cooldown
})

module.exports = async (clips, m, chatUpdate, plugins, store) => {
   try {
      require('./system/svcop')(m)
      const isOwner = [clips.decodeJid(clips.user.id).split`@` [0], env.owner, ...global.db.setting.owners].map(v => v + '@s.whatsapp.net').includes(m.sender)
      const isMods = [clips.decodeJid(clips.user.id).split`@` [0], env.owner, ...global.db.setting.mods].map(v => v + '@s.whatsapp.net').includes(m.sender)
      const isPrem = (global.db.users.some(v => v.jid == m.sender) && global.db.users.find(v => v.jid == m.sender).premium) || isOwner
      const groupMetadata = m.isGroup ? await clips.groupMetadata(m.chat) : {}
      const participants = m.isGroup ? groupMetadata.participants : [] || []
      const adminList = m.isGroup ? await clips.groupAdmin(m.chat) : [] || []
      const isAdmin = m.isGroup ? adminList.includes(m.sender) : false
      const isBotAdmin = m.isGroup ? adminList.includes((clips.user.id.split`:` [0]) + '@s.whatsapp.net') : false
      const blockList = typeof await (await clips.fetchBlocklist()) != 'undefined' ? await (await clips.fetchBlocklist()) : []
      const groupSet = global.db.groups.find(v => v.jid == m.chat)
      const chats = global.db.chats.find(v => v.jid == m.chat)
      const users = global.db.users.find(v => v.jid == m.sender)
      const setting = global.db.setting
      const body = typeof m.text == 'string' ? m.text : false
      if (setting.debug && !m.fromMe && isOwner) clips.reply(m.chat, Func.jsonFormat(m), m)
      if (m.isGroup && !isBotAdmin) {
         groupSet.localonly = false
      }
      if (m.isGroup && groupSet.autoread) await clips.readMessages([m.key])
      if (!m.isGroup) await clips.readMessages([m.key])
      if (m.isGroup) groupSet.activity = new Date() * 1
      if (m.isGroup && !groupSet.stay && (new Date * 1) >= groupSet.expired && groupSet.expired != 0) {
         return clips.reply(m.chat, Func.texted('italic', '🔔 Bot time has expired and will leave from this group, thank you.', null, {
            mentions: participants.map(v => v.id)
         })).then(async () => {
            groupSet.expired = 0
            await Func.delay(2000).then(() => clips.groupLeave(m.chat))
         })
      }
      if (users && (new Date * 1) >= users.expired && users.expired != 0) {
         return clips.reply(m.chat, Func.texted('italic', '🔔 Your premium package has expired, thank you for buying and using our service.'), m).then(async () => {
            users.premium = false
            users.expired = 0
            users.limit = env.limit
         })
      }
      if (users) {
         users.name = m.pushName
         users.lastseen = new Date() * 1
      }
      if (chats) {
         chats.lastseen = new Date() * 1
         chats.chat += 1
      }
      if (m.isGroup && !m.isBot && users && users.afk > -1) {
         clips.reply(m.chat, `You are back online after being offline for : ${Func.texted('bold', Func.toTime(new Date - users.afk))}\n\n➠ ${Func.texted('bold', 'Reason')}: ${users.afkReason ? users.afkReason : '-'}`, m, { montions: users.afk })
         users.afk = -1
         users.afkReason = ''
         users.afkObj = {}
      }
      // reset limit
      cron.schedule('00 00 * * *', () => {
         setting.lastReset = new Date * 1
         global.db.users.filter(v => v.limit < env.limit && !v.premium).map(v => v.limit = env.limit)
         Object.entries(global.db.statistic).map(([_, prop]) => prop.today = 0)
      }, {
         scheduled: true,
         timezone: global.timezone
      })
      if (m.isGroup && !m.fromMe) {
         let now = new Date() * 1
         if (!groupSet.member[m.sender]) {
            groupSet.member[m.sender] = {
               lastseen: now,
               warning: 0
            }
         } else {
            groupSet.member[m.sender].lastseen = now
         }
      }
      if (!m.fromMe && m.isBot && m.mtype == 'audioMessage' && m.msg.ptt) return clips.sendMessage(m.chat, {
         delete: {
            remoteJid: m.chat,
            fromMe: false,
            id: m.key.id,
            participant: m.sender
         }
      })
      let getPrefix = body ? body.charAt(0) : ''
      let isPrefix = (setting.multiprefix ? setting.prefix.includes(getPrefix) : setting.onlyprefix == getPrefix) ? getPrefix : undefined
      component.Logs(clips, m, isPrefix)
      if (m.isBot || m.chat.endsWith('broadcast')) return
      const commands = Func.arrayJoin(Object.values(Object.fromEntries(Object.entries(plugins).filter(([name, prop]) => prop.run.noxious))).map(v => v.run.noxious)).concat(Func.arrayJoin(Object.values(Object.fromEntries(Object.entries(plugins).filter(([name, prop]) => prop.run.hidden))).map(v => v.run.hidden)))
      const args = body && body.replace(isPrefix, '').split` `.filter(v => v)
      const command = args && args.shift().toLowerCase()
      const clean = body && body.replace(isPrefix, '').trim().split` `.slice(1)
      const text = clean ? clean.join` ` : undefined
      const prefixes = global.db.setting.multiprefix ? global.db.setting.prefix : [global.db.setting.onlyprefix]
      let matcher = Func.matcher(command, commands).filter(v => v.accuracy >= 60)
      if (isPrefix && !commands.includes(command) && matcher.length > 0 && !setting.self) {
      if (!m.isGroup || (m.isGroup && !groupSet.mute)) return clips.reply(m.chat, `🔔 Command you are using is wrong, try the following recommendations :\n\n${matcher.map(v => '➠ *' + (isPrefix ? isPrefix : '') + v.string + '* (' + v.accuracy + '%)').join('\n')}`, m)
      }
      if (body && isPrefix && commands.includes(command) || body && !isPrefix && commands.includes(command) && setting.noprefix || body && !isPrefix && commands.includes(command) && env.evaluate_chars.includes(command)) {
         const is_commands = Object.fromEntries(Object.entries(plugins).filter(([name, prop]) => prop.run.noxious))
         if (setting.error.includes(command)) return clips.reply(m.chat, Func.texted('bold', `🚩 Command _${(isPrefix ? isPrefix : '') + command}_ disabled.`), m)
         if (!m.isGroup && env.blocks.some(no => m.sender.startsWith(no))) return clips.updateBlockStatus(m.sender, 'block')
         if (commands.includes(command)) {
            users.hit += 1
            users.usebot = new Date() * 1
            Func.hitstat(command, m.sender)
         }
         for (let name in is_commands) {
            let cmd = is_commands[name].run
            let turn = cmd.noxious instanceof Array ? cmd.noxious.includes(command) : cmd.noxious instanceof String ? cmd.noxious == command : false
            let turn_hidden = cmd.hidden instanceof Array ? cmd.hidden.includes(command) : cmd.hidden instanceof String ? cmd.hidden == command : false
            if (body && env.evaluate_chars.some(v => body.startsWith(v)) && !body.startsWith(isPrefix)) return
            if (!turn && !turn_hidden) continue
            if (!m.isGroup && env.blocks.some(no => m.sender.startsWith(no))) return clips.updateBlockStatus(m.sender, 'block')
            if (m.isBot || m.chat.endsWith('broadcast') || /edit/.test(m.mtype)) continue
            if (setting.self && !isOwner && !m.fromMe) return
            if (setting.pluginDisable.includes(name)) return clips.reply(m.chat, Func.texted('bold', `🚩 Plugin disabled by Owner.`), m)
            if (!m.isGroup && !['owner'].includes(name) && chats && !isPrem && !users.banned && new Date() * 1 - chats.lastchat < env.timer) continue
            if (!m.isGroup && !['owner', 'menfess', 'verify', 'verifymail'].includes(name) && chats && !isPrem && !users.banned && setting.groupmode) return clips.sendMessageModify(m.chat, `⚠️ Using bot in private chat only for premium user, upgrade to premium plan only Rp. 10,000,- to get 3K limits for 1 month.\n\nIf you want to buy contact *${prefixes[0]}owner*`, m, {
               largeThumb: true,
               thumbnail: await Func.fetchBuffer('https://iili.io/JTRzjBS.jpg'),
               url: setting.link
            }).then(() => chats.lastchat = new Date() * 1)
            if (!['me', 'owner', 'exec'].includes(name) && users && (users.banned || new Date - users.banTemp < env.timer)) return
            if (m.isGroup && !['activation', 'groupinfo', 'exec', 'makeAdmin'].includes(name) && groupSet.mute) continue
            if (m.isGroup && !isOwner && /chat.whatsapp.com/i.test(text)) return clips.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
            if (cmd.cache && cmd.location) {
               let file = require.resolve(cmd.location)
               Func.reload(file)
            }
            if (cmd.error) {
               clips.reply(m.chat, global.status.errorF, m)
               continue
            }
            if (cmd.restrict && !isOwner && text && new RegExp('\\b' + global.db.setting.toxic.join('\\b|\\b') + '\\b').test(text.toLowerCase())) {
               clips.reply(m.chat, `🚩 You violated the *Terms & Conditions* of using bots by using blacklisted keywords, as a penalty for your violation being blocked and banned. To unblock and unbanned you have to pay *Rp. 10,000,-*`, m).then(() => {
                  users.banned = true
                  clips.updateBlockStatus(m.sender, 'block')
               })
               continue
            }
            if (cmd.owner && !isOwner) {
               clips.reply(m.chat, global.status.owner, m)
               continue
            }
            if (cmd.mods && !isMods) {
               clips.reply(m.chat, global.status.mods, m)
               continue
            }
            if (cmd.premium && !isPrem) {
               clips.reply(m.chat, global.status.premium, m)
               continue
            }
            if (cmd.limit && users.limit < 1) {
               return clips.sendMessageModify(m.chat, `🔔 Your bot usage limit has expired and will be reset at 00.00 WIB\n\nTo get more limits upgrade to premium send *${prefixes[0]}premium*`, m, {
               largeThumb: true,
               thumbnail: await Func.fetchBuffer('https://iili.io/JTRzjBS.jpg')
            },  { montions: [m.sender] }).then(() => users.premium = false)
               continue
            }
            if (cmd.limit && users.limit > 0) {
               let limit = cmd.limit.constructor.name == 'Boolean' ? 1 : cmd.limit
               if (users.limit >= limit) {
                  users.limit -= limit
               } else {
                  clips.reply(m.chat, Func.texted('bold', `🚩 Your limit is not enough to use this feature.`), m)
                  continue
               }
            }
            if (cmd.group && !m.isGroup) {
               clips.reply(m.chat, global.status.group, m)
               continue
            } else if (cmd.botAdmin && !isBotAdmin) {
               clips.reply(m.chat, global.status.botAdmin, m)
               continue
            } else if (cmd.admin && !isAdmin) {
               clips.reply(m.chat, global.status.admin, m)
               continue
            }
            if (cmd.private && m.isGroup) {
               clips.reply(m.chat, global.status.private, m)
               continue
            }
            cmd.async(m, {
               clips,
               args,
               text,
               isPrefix: isPrefix ? isPrefix : '',
               command,
               participants,
               blockList,
               isPrem,
               isOwner,
               isAdmin,
               isBotAdmin,
               users,
               chats,
               groupSet,
               setting,
               plugins,
               store
            })
            break
         }
      } else {
         let prefixes = setting.multiprefix ? setting.prefix : [setting.onlyprefix]
         const is_events = Object.fromEntries(Object.entries(plugins).filter(([name, prop]) => !prop.run.noxious))
         for (let name in is_events) {
            let event = is_events[name].run
            if (m.fromMe || m.chat.endsWith('broadcast') || /pollUpdate/.test(m.mtype)) continue
            if (event.cache && event.location) {
               let file = require.resolve(event.location)
               Func.reload(file)
            }
            if (!m.isGroup && env.blocks.some(no => m.sender.startsWith(no))) return clips.updateBlockStatus(m.sender, 'block')
            if (m.isGroup && !['exec'].includes(name) && groupSet.mute) continue
            if (setting.pluginDisable.includes(name)) continue
            if (!m.isGroup && chats && !isPrem && !users.banned && new Date() * 1 - chats.lastchat < env.timer) continue
            if (!m.isGroup && chats && !isPrem && !users.banned && !['chatAI'].includes(name) && setting.groupmode) return clips.sendMessageModify(m.chat, `🔔 Using bot in private chat only for premium user, upgrade to premium plan only Rp. 10,000,- to get 3K limits for 1 month.\n\nIf you want to buy contact *${prefixes[0]}owner*`, m, {
               largeThumb: true,
               thumbnail: await Func.fetchBuffer('https://iili.io/JTRzjBS.jpg'),
               url: setting.link
            },  { montions: [m.sender] }).then(() => chats.lastchat = new Date() * 1)
            if (setting.self && !['chatAI', 'exec'].includes(name) && !isOwner && !m.fromMe) continue
            if (!m.isGroup && ['chatAI'].includes(name) && body && Func.socmed(body)) continue
            if (!['exec', 'restrict'].includes(name) && users && users.banned) continue
            if (!['anti_link', 'anti_tagall', 'anti_virtex', 'filter', 'exec'].includes(name) && users && (users.banned || new Date - users.banTemp < env.timer)) continue
            if (!['anti_link', 'anti_tagall', 'anti_virtex', 'filter', 'exec'].includes(name) && groupSet && groupSet.mute) continue
            if (event.error) continue
            if (event.owner && !isOwner) continue
            if (event.group && !m.isGroup) continue
            if (event.limit && users.limit < 1) continue
            if (event.botAdmin && !isBotAdmin) continue
            if (event.admin && !isAdmin) continue
            if (event.private && m.isGroup) continue
            if (event.premium && !isPrem && body && Func.socmed(body)) return clips.reply(m.chat, global.status.premium, m)
            event.async(m, {
               clips,
               body,
               participants,
               prefixes,
               isOwner,
               isAdmin,
               isBotAdmin,
               users,
               chats,
               groupSet,
               groupMetadata,
               setting,
               plugins,
               store
            })
         }
      }
   } catch (e) {
   if (/(undefined|overlimit|timed|timeout|users|item|time)/ig.test(e.message)) return
      console.log(e)
      if (!m.fromMe) return m.reply(Func.jsonFormat(new Error('nexon-bot encountered an error :' + e)))
   }
   Func.reload(require.resolve(__filename))
}

//Func.reload(require.resolve(__filename))

