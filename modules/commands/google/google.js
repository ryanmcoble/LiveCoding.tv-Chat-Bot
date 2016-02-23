module.exports = function() {

	var google = require('google');

	google.resultsPerPage = 10;

	var resultCount = 3;
	
	function CreditsCommand() {

		return {
			name: 'google',
			params: '$query - search query string',
			execute: function(data, sandbox) {

				var resultsAdded = 0;

				google(data.params, function(err, next, links) {

					if(err) console.error(err);

					var msg = '';

					for(var i = 0; i < links.length; i++) {

						if(resultsAdded >= resultCount) break;

						var link = links[i];

						if(link.title && link.link) {
							msg += link.title + ' - ' + link.link + '\n';
							if(link.description) msg += link.description + '\n\n';

							resultsAdded++
						}
					}


					if(msg) {
						sandbox.sendChannelMessage('\n' + msg + '\n\n\n');
					}

				});

			}
		};
	}


	return new CreditsCommand();

};