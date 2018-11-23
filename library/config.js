module.exports = (function() {
	const path = require('path')
	const fs = require('fs')
	let configFileName = path.join('..', 'config.json')
	if (!fs.existsSync(configFileName)) {
		configFileName = path.join('.', 'config.json')
		if (!fs.existsSync(configFileName)) {
			console.log('Fatail error: config.json file not exists.')
			process.exit(1)
		}
	}

	let jsonConfig = fs.readFileSync(configFileName)

	return JSON.parse(jsonConfig)
})()
