module.exports = function() {
	
	function ListCommand() {

		return {
			name: 'list',
			params: '[none]',
			execute: function(data, sandbox) {


				var msg = '\nCOMMANDS:\n';

				for(var i = 0; i < data.commands.length; i++) {
					
					var command = data.commands[i];

					msg += data.configs.settings.general.initiator + command.name + ': ' + command.params + '\n';
				}


				sandbox.sendChannelMessage(msg + '\n\n');
			}
		};
	}


	return new ListCommand();

};