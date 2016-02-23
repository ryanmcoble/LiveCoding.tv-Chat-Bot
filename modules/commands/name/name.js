module.exports = function() {

	var req = require('request');

	
	function NameCommand() {


		function getRandomName(callback) {
			req('https://randomuser.me/api', callback);
		}

		return {
			name: 'name',
			params: '[none]',
			execute: function(data, sandbox) {

				var msg = '\nRANDOM NAME:\n';

				getRandomName(function(err, response) {

					var res = JSON.parse(response.body).results;

					var user = res[0].user;

					var name = user.name.title + '. ' + user.name.first + ' ' + user.name.last;

					msg += name + '\n\n\n';

					sandbox.sendChannelMessage(msg);
				});
			}
		};
	}


	return new NameCommand();

};