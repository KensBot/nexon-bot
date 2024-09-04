exports.run = {
   noxious: ['calc'],
   hidden: ['c'],
   use: 'expression',
   category: 'others',
   async: async (m, {
      clips,
      text,
      isPrefix,
      command
   }) => {
      if (!text) return clips.reply(m.chat, Func.example(isPrefix, command, '2 * 5'), m)
      let val = text
         .replace(/[^0-9\-\/+*×÷πEe()piPI/]/g, '')
         .replace(/×/g, '*')
         .replace(/÷/g, '/')
         .replace(/π|pi/gi, 'Math.PI')
         .replace(/e/gi, 'Math.E')
         .replace(/\/+/g, '/')
         .replace(/\++/g, '+')
         .replace(/-+/g, '-')
      let format = val
         .replace(/Math\.PI/g, 'π')
         .replace(/Math\.E/g, 'e')
         .replace(/\//g, '÷')
         .replace(/\*×/g, '×')
      try {
         let result = (new Function('return ' + val))()
         if (!result) return clips.reply(m.chat, result, m)
         clips.reply(m.chat, `*${format}* = ${result}`, m)
      } catch (e) {
         if (e == undefined) return clips.reply(m.chat, Func.example(isPrefix, command, '2 * 5'), m)
         return clips.reply(m.chat, Func.example(isPrefix, command, '2 * 5'), m)
      }
   },
   error: false
}