module.exports = function() {

	var google = require('google');

	google.resultsPerPage = 3;
	
	function CreditsCommand() {

		return {
			name: 'google',
			params: '$query - search query string',
			execute: function(data, sandbox) {

				var msg = '\n';

				google(data.params, function(err, next, links) {

					if(err) console.error(err);

					for(var i = 0; i < links.length; i++) {

						var link = links[i];
						msg += link.title + ' - ' + link.link + '\n';
						if(link.description) msg += link.description + '\n\n';
					}


					sandbox.sendChannelMessage(msg + '\n\n\n');

				});

			}
		};
	}


	return new CreditsCommand();

};