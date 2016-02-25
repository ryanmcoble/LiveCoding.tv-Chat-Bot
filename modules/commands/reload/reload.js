
module.exports = function() {
	
	function ReloadCommand() {


		return {
			name: 'reload',
			params: '[none]',
			execute: function(data, sandbox) {

				sandbox.loadConfigs();
				sandbox.loadCommands();

				var msg = 'Commands and configurations have been reloaded!';

				sandbox.sendChannelMessage(msg);

			}
		};
	}


	return new ReloadCommand();

};