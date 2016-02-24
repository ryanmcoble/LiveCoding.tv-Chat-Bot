module.exports = function(system, stanza, configs) {

	if(stanza.is('message')) {
		stanza.attrs.to = stanza.attrs.from;
		delete stanza.attrs.from;


		var msg = stanza.children[0].children[0];

		var username = stanza.attrs.to.split('/')[1];

		// check that it is not a message from ourself
		if(username === configs.username) return system;


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


		var directedResponsePattern = RegExp('.*\@' + configs.username + '.*');
		if(directedResponsePattern.test(msg)) {

			var responses = [
				'@' + username + ' you talking to me kid?',
				'@' + username + '\'s mom likes cake. He he.',
				'Yo @' + username + ' how\'s it going?',
				'I think @' + username + ', thinks I\'m cool!',
				'@' + username + ' what do you mean exactly?',
				'@' + username + ' Do you like cookies.',
				'Idk what to do about @' + username + '! He keeps following me everywhere... Someone please help!',
				'When did noobs like @' + username + ' join LCTV?',
				'I love LCTV! How about you @' + username + '?',
				'What about cats? @' + username,
				'Sometimes you just need to get away. Ain\'t that right @' + username + '?',
				'What are you going to do about it? @' + username
			];


			var res = responses[(Math.floor(Math.random() * responses.length) + 0)];

			setTimeout(function() {
				system.sendChannelMessage(res);
			}, 3000);

			return system;
		}


		var sayBotWelcomePattern = RegExp('^Hi ' + configs.username + '.*');
		var sayBot2WelcomePattern = RegExp('^' + configs.username + '.* you are connected!');
		if(sayBotWelcomePattern.test(msg) || sayBot2WelcomePattern.test(msg)) {
			system.sendChannelMessage('What\'s up my bot brother!');
			return system;
		}


		var sayBotRosterReponsePattern = RegExp('^Camilo, There are .* online people at chat:.*');
		if(sayBotRosterReponsePattern.test(msg)) {

			if(msg.indexOf(configs.username) === -1) return system;

			setTimeout(function() {
				system.sendChannelMessage('Well that\'s cool you found me ' + username + ', darn!');
			}, 5 * 1000);

			return system;
		}


		// initiator character
		var initiatorPattern = RegExp('^' + configs.settings.general.initiator);
		if(initiatorPattern.test(msg)) {


			// only listen to me
			if(configs.settings.general.only_listen_to_me && username !== configs.settings.follow.username) {
				return system;
			}


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
		else{


			var from = stanza.attrs.to.split('/')[1],
				msg = stanza.getChild('body').children.toString();

			// normal message not a command
			console.log(from + ': ' + msg);



		}

	}


	return system;

};