if (process.argv.includes('--server')) require('./server')
require('dotenv').config(), require('rootpath')()
const { spawn: spawn } = require('child_process'), path = require('path'), colors = require('@colors/colors/safe'), CFonts = require('cfonts'), { Function: Func, NexonScraper: Opi } = new(require('nexonprime')), chalk = require('chalk')

const unhandledRejections = new Map()
process.on('unhandledRejection', (reason, promise) => {
   unhandledRejections.set(promise, reason)
   console.log('Unhandled Rejection at:', promise, 'reason:', reason)
})
process.on('rejectionHandled', (promise) => {
   unhandledRejections.delete(promise)
})
process.on('Something went wrong', function(err) {
   console.log('Caught exception: ', err)
})

function start() {
	let args = [path.join(__dirname, 'clips.js'), ...process.argv.slice(2)]
	let p = spawn(process.argv[0], args, { stdio: ['inherit', 'inherit', 'inherit', 'ipc'] })
	.on('message', data => {
		if (data == 'reset') {
			console.log('Restarting...')
			p.kill()
			delete p
		}
	})
	.on('exit', code => {
		console.error('Exited with code:', code)
		start()
	})
}

CFonts.say('NEXON BOT', {
   font: 'simple',
   align: 'center',
   colors: ['candy']
}), CFonts.say('Github : https://github.com/KensBot/nexon-bot', {
   colors: ['candy'],
   font: 'console',
   align: 'center'
})

// dont remove this code if you need update notification
async function checkUpdate() {
	try {
		const vcode = require('./version.json').semantic.version
		const json = await Opi.version()
		if (json.status && json.data.version != vcode) return ({
			update: true,
			...json.data
		})
		return ({
			update: false
		})
	} catch (e) {
		console.log(e)
		return ({
			update: false
		})
	}
}

checkUpdate().then(json => {
	if (json.update) {
		const vcode = require('./version.json').semantic.version
		let i = chalk.black(chalk.bgGreen(` Update available ${vcode} ~> ${json.version} `))
		i += `\n\n${json.commit}\n\n`
		i += chalk.green(json.url)
		console.log(i)
	} else {
		start()
	}
})