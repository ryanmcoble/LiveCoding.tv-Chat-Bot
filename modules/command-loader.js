module.exports = (function() {

	/*
	commands = [
		{
			name: 'echo'
			execute: function(data, sendMessage) {
				data.params = a string of command parameters (not including command name)

				sendMessage('response message'); = method to send channel messages
			}
		}
	];
	*/

	function commandLoader(commands) {

		var loadedCommands = [];

		for(var i = 0; i < commands.length; i++) {
			var commandName = commands[i];


			var command = require('./commands/' + commandName + '/' + commandName + '.js');

			if(typeof command === 'undefined') {
				console.error('unabled to load command "' + commandName + '"');
				continue;
			}

			command = command();

			if(typeof command.name === 'undefined' || typeof command.execute === 'undefined') {
				console.error('invalid command format "' + commandName + '"');
				continue;
			}


			console.log('loaded "' + command.name + '" command');

			loadedCommands.push(command);

		}

		return loadedCommands;
	}



	return {
		load: commandLoader
	};
})();