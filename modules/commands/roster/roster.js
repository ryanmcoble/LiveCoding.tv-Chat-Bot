
module.exports = function() {
	
	function RosterCommand() {

		return {
			name: 'roster',
			params: '[none]',
			execute: function(data, sandbox) {

				var roster = data.roster;

				var msg = '\nROSTER:\n';
				var i = 0;
				for(var jid in roster) {
					var user = roster[jid];

					if(data.configs.username === user) continue; //remove ourself

					msg += (i + 1) + ')  ' + user.name + (user.isMod ? ' (mod)' : (user.isOwner ? ' (owner)' : (user.isBot ? ' (bot)' : ''))); //+ ': ' + user.jid;
					msg += '\n';

					i++;
				}

				msg += '\nTOTAL: ' + (i - 1); // - 1 to remove ourself
				
				sandbox.sendChannelMessage(msg + '\n\n\n');
			}
		};
	}


	return new RosterCommand();

};