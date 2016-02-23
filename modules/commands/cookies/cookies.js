 module.exports = function() {
	
	function CookiesCommand() {

		return {
			name: 'cookies',
			params: '[none]',
			execute: function(data, sandbox) {

				var msg = 'Join the dark side, we have free cookies!';

				sandbox.sendChannelMessage(msg);
			}
		};
	}


	return new CookiesCommand();

};