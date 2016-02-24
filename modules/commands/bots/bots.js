
module.exports = function() {
	
	function BotDetectionCommand() {

		return {
			name: 'bots',
			params: '[none]',
			execute: function(data, sandbox) {


				var roster = sandbox.getRoster();

				var msg = '';

				var count = 0,
					bots = [];


				for(var i in roster) {

					var user = roster[i];

					if(user.isBot) {

						bots.push(user.name);
					}

					count++;
				}


				var last = bots.pop();
				if(bots.length > 2) msg = ' bots. They are ' + bots.join(', ') + ' and ' + last;
				else if(bots.length === 2) msg = ' bots. They are ' + bots.join(' and ');
				else if(bots.length === 1) msg = ' bot. It is ' + bots.join('');

				if(bots.length >= 1) {
					msg = 'I have currently identified ' + bots.length + msg + '!';
				}
				else {
					msg = 'I was unable to identify any bots.';
				}
				
				sandbox.sendChannelMessage(msg);

				
			}
		};
	}


	return new BotDetectionCommand();

};