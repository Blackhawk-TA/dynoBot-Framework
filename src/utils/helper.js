exports.help = function(msg) {
	console.log("Public helper: " + msg);
	_imPrivate();
};

_imPrivate = function() {
	console.log("I'm a private function called by a public helper function within helper.js.")
};