
module.exports = function() {
	
	function LeaveCommand() {

		return {
			name: 'leave',
			params: '$delay - the delay in seconds before return (default 20 seconds)',
			execute: function(data, sandbox) {

				var msg = 'Bye guys!';
				sandbox.sendChannelMessage(msg + '\n\n\n');

				sandbox.leaveChannel(data.configs.channel_username);

				var delay = parseInt(data.params) >= 5 ? parseInt(data.params) : 20;

				setTimeout(function() {
					sandbox.joinChannel(data.configs.channel);

					var msg = 'I\'m back guys!';
					sandbox.sendChannelMessage(msg + '\n\n\n');
				}, (1000 + delay));
			}
		};
	}


	return new LeaveCommand();

};