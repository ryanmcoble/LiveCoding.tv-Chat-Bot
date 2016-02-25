module.exports = function(system, stanza, configs) {

	var from = stanza.attrs.from;
	var username = from.split('/')[1];

	/*if(stanza.attrs.id === 'roster_0') {

		system.roster = {};

		var items = stanza.getChild('query').children;

		console.log(items.length);

		for(var i = 0; i < items.length; i++) {

			var item = items[i];

			//console.log(item);


			system.roster[item.attrs.jid] = {
				jid: item.attrs.jid,
				name: item.attrs.name,
				isMod: false,
				isOwner: false,
				isBot: false
			};

		}

		console.log('Channel roster response', system.roster);
	}*/


	/*var x = stanza.getChild('x');

	if(!x) return system;


	var affiliation = x.getChild('item').attrs.affiliation;
	var role        = x.getChild('item').attrs.role;

	var isMod   = affiliation === 'admin' ? true : false;
	var isOwner = affiliation === 'owner' ? true : false;
	var isBot   = from.indexOf('bot') || from.indexOf(configs.username) > -1 ? true : false;


	// user left channel
	if(typeof stanza.attrs.type !== 'undefined' && stanza.attrs.type === 'unavailable') {

		// remove from roster
		delete system.roster[from];

		// add or remove ourself from the roster but return before sending out the message
		if(username === configs.username) return system;


		var msg = configs.settings.messages.goodbye_message || 'Goodbye';

		if(isMod) {
			msg  += ' ' + (configs.settings.messages.moderator_message || 'Moderator') + ' ' + username;
		}
		else if(isOwner) {
			msg += ' ' + (configs.settings.messages.owner_message || 'Master') + '!';
		}
		else if(isBot) {
			msg += ' ' + (configs.settings.messages.bot_message || 'BOT') + ' ' + username + '!';
		}
		else {
			msg += ' ' + username;
		}
		
		if(configs.settings.general.has_channel_leave_greeting) system.sendChannelMessage(msg);

		console.log(username + ': is no longer on my radar');

	}
	// user joined the channel
	else {

		var alreadyOnRoster = typeof system.pastUsers[from] !== 'undefined' ? true : false;

		system.pastUsers[from] = {};

		// add to roster
		system.roster[from] = {
			jid: from,
			name: username,
			isMod: isMod,
			isOwner: isOwner,
			isBot: isBot
		};

		// add or remove ourself from the roster but return before sending out the message
		if(username === configs.username) return system;


		var msg = configs.settings.messages.greeting_message || 'Hello';

		if(alreadyOnRoster) msg += ' ' + (configs.settings.messages.already_on_roster_message || 'again');

		if(isMod) {
			msg += ' ' + (configs.settings.messages.moderator_message || 'Moderator') + ' ' + username;
		}
		else if(isOwner) {
			msg += ' ' + (configs.settings.messages.owner_message || 'Master') + '!';
		}
		else if(isBot) {
			msg += ' ' + (configs.settings.messages.bot_message || 'BOT') + ' ' + username + '!';
		}
		else {
			msg += ' ' + username;
		}
		if(configs.settings.general.has_channel_enter_greeting) system.sendChannelMessage(msg);

		console.log(username + ': is now on my radar');

	}*/

	return system;

};