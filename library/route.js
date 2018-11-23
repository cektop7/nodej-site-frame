var Route = function() {
	const path = require('path')

	this.routeFileName = path.join(global.appConfig.ROUTE_DIR, global.appConfig.ROUTE_FILE_NAME)

	const fs = require('fs')
	
	if (!fs.existsSync(this.routeFileName)) {
		console.log('Fatail error: route.json file not exists.')
		process.exit(1)
	}

	let json_route = fs.readFileSync(this.routeFileName)
	this.route = JSON.parse(json_route)

	this.controller = function(url) {
		url = url || '/'
		if (this.route.hasOwnProperty(url)) {
			let route = this.route[url]

			//Varian 1. path/controller/method
			let controller_path = path.dirname(path.dirname(route))
			if (fs.existsSync(path.join(global.appConfig.CONTROLLER_DIR, controller_path))) {
				let controller_file = path.parse(path.dirname(route)).base + '.js'
				if (fs.existsSync(path.join(global.appConfig.CONTROLLER_DIR, controller_path, controller_file))) {
					let controller_method = path.parse(route).base
					let controller = require(path.join(global.appConfig.CONTROLLER_DIR, controller_path, controller_file))
					if (controller.hasOwnProperty(controller_method)) return controller[controller_method]
				}
			}

			//Varian 2. path/controller
			controller_path = path.dirname(route)
			let controller_file = path.parse(route).base
			if (fs.existsSync(path.join(global.appConfig.CONTROLLER_DIR, controller_path, controller_file) + '.js')) {
				let controller = require(path.join(global.appConfig.CONTROLLER_DIR, controller_path, controller_file))
				return controller
			}
		}
		return false
	}

	this.error404 = function() {
		let controller = require(path.join(global.appConfig.CONTROLLER_ERROR_DIR, global.appConfig.CONTROLLER_404))
		return controller
	}
}

module.exports = Route
