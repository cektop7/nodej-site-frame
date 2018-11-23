var NodeJSFrame = function() {
	global.appConfig = require('./library/config')

	const path = require('path')
	const express = require('express')
	let app = express()
	app.set('views', global.appConfig.VIEW_DIR)
	app.set('view engine', 'pug')

	app.use(express.static(global.appConfig.PUBLIC_DIR))

	let route = require(path.join(global.appConfig.LIBRARY_DIR, 'route'))
	route = new route()

	app.use(/.*/, (req, res, next) => {
		let controller = route.controller(req.baseUrl)

		if (!controller) controller = route.error404()

		controller(req, res)

		next();
	});

	app.listen(80, () => {
		console.log('Server ready on port 80.')
	});
}

var nodejsFrame = new NodeJSFrame()
