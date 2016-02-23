module.exports = function(system, stanza, configs) {

	if(stanza.is('message')) {
		stanza.attrs.to = stanza.attrs.from;
		delete stanza.attrs.from;


		var msg = stanza.children[0].children[0];

		var username = stanza.attrs.to.split('/')[1];

		// check that it is not a message from ourself
		if(username === configs.username) return system;


		// only listen to me
		if(configs.settings.general.only_listen_to_me && username !== configs.username) {
			return system;
		}


		// built-in say bye command
		var sayByePattern = RegExp('^say bye \@' + configs.username + '.*');
		if(sayByePattern.test(msg)) {
			system.sendChannelMessage('Bye guys!');
			process.exit(0);
		}

		var sayHiPattern = RegExp('^say hi \@' + configs.username + '.*');
		if(sayHiPattern.test(msg)) {
			system.sendChannelMessage('Hi guys!');
			return system;
		}


		// initiator character
		var initiatorPattern = RegExp('^' + configs.settings.general.initiator);
		if(initiatorPattern.test(msg)) {


			var cmd = msg.substr(1); // remove initiator
			commandName = cmd.split(' ')[0]; // get command name entered
			var params = cmd.substr(commandName.length + 1); // get command parameter string
			
			if(!commandName) return system;


			var data = {
				username: username,
				params: params,
				roster: system.roster,
				commands: system.commands,
				configs: configs
			}

			var found = false;

			for(var i = 0; i < system.commands.length; i++) {

				var command = system.commands[i];

				if(commandName === command.name) {

					command.execute(data, system);
					found = true;

				}

			}

			// command unsupported message
			if(configs.settings.general.has_command_unsupported_message && !found) {
				system.sendChannelMessage('\nUNKNOWN COMMAND:\ncommand "' + commandName + '" is not supported!\n\n\n');
			}


		}

	}


	return system;

};