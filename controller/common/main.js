module.exports = function(req, res) {
	res.end('I\'am main controller.')
}

module.exports.otherPoint = function(req, res) {
	res.end('I\'am other point in controller.')
}
