exports.run = {
   noxious: ['getbio'],
   category: 'about',
   async: async (m, {
      clips,
      isPrefix,
      command
   }) => {
	try {
		let who;
		if (m.isGroup)
			who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;
		else who = m.quoted.sender ? m.quoted.sender : m.sender;
		let bio = await clips.fetchStatus(who);
		m.reply(bio.status);
	} catch {
		if (text) throw `Bio Is Private!`;
		else
			try {
				let who = m.quoted ? m.quoted.sender : m.sender;
				let bio = await clips.fetchStatus(who);
				m.reply(bio.status);
			} catch {
				throw `Bio Is Private!`;
			}
	}
},
error: false,
limit: true
}
