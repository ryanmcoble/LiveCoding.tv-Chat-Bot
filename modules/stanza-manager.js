module.exports = function(system, stanza, configs) {

	var manager = require('./stanza_managers/' + stanza.name + '.js');

	if(typeof manager === 'undefined') {
		console.error('unsupported stanza type "' + stanza.name + '"');

		return system;
	}

	return new manager(system, stanza, configs);

};