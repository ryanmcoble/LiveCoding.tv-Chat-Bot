module.exports = function() {
	
	function EchoCommand() {

		return {
			name: 'echo',
			params: '$msg = message sent',
			execute: function(data, sandbox) {

				sandbox.sendChannelMessage('\nECHO:\n\n' + data.params + '\n\n\n');
			}
		};
	}


	return new EchoCommand();

};