
module.exports = function() {
	
	function LiveStreamsCommand() {


		var lctv_parser = require('./../../lctv_parser.js');

		console.log(lctv_parser);

		return {
			name: 'livestreams',
			params: '--featured - to show only featured streams',
			execute: function(data, sandbox) {

				var parser = new lctv_parser(data.configs);

				var featuredOnly = (data.params.indexOf('--featured') === -1) ? false : true;

				parser.getLiveStreams(function(channels) {

					var msg = '\nLIVE STREAMS:\n';

					var count = 0;

					for(var i = 0; i < channels.length; i++) {
						var channel = channels[i];

						if(featuredOnly && !channel.featured) continue;

						msg += (count + 1) + ')  ' + channel.username + ' : https://livecoding.tv/' + channel.username; //+ ': ' + user.jid;
						msg += '\n';

						count++;
					}
					
					sandbox.sendChannelMessage(msg + '\n\n\n');

				});
			}
		};
	}


	return new LiveStreamsCommand();

};