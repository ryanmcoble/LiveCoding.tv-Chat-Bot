module.exports = function() {
	
	function HelpCommand() {

		return {
			name: 'help',
			params: '$command = command (optional)',
			execute: function(data, sandbox) {

				sandbox.sendChannelMessage('\nHELP:\nHelp command functionality is unfinished.\n\n\n');
			}
		};
	}


	return new HelpCommand();

};