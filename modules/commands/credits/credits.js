module.exports = function() {
	
	function CreditsCommand() {

		return {
			name: 'credits',
			params: '[none]',
			execute: function(data, sandbox) {

				var msg = '\nCREDITS:\n';

				msg += 'Hack Bot\n';
				msg += 'version: v1\n';
				msg += 'created by: R.M.C. (hacktastic)\n\n\n';

				sandbox.sendChannelMessage(msg);
			}
		};
	}


	return new CreditsCommand();

};