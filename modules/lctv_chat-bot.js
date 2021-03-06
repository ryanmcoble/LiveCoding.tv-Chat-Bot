var ltx  = require('node-xmpp-core').ltx,
	xmpp = require('node-xmpp-client'),
	commandLoader = require('./command-loader.js'),
	stanzaManager = require('./stanza-manager.js'),
	fs		      = require('fs');



function LCTVChatBot(configs) {

	var self = this;
	self.roster = {};
	self.pastUsers = {};
	self.commands = [];
	self.roster = {};


	// attemp connection
	this.client = new xmpp({
		jid: configs.jid + '/bot',
		password: configs.password
	});


	// handshake - emits event once connected to server
	this.client.on('online', function() {


		// set ourselves as available
		var handshake = new ltx.Element('presence', {
			type: 'available'
		}).c('show').t('chat');
		self.client.send(handshake);
		console.log('presence changed to available');
		//self.emit('online');

		
		self.joinChannel(configs.channel_username);


		console.log('Set presence request:', handshake.toString());


		// channel roster
		var roster = new ltx.Element("iq", {
			to: configs.channel_username + '@chat.livecoding.tv',
			id: 'roster_0',
			type: 'get'
		}).c("query", {
			xmlns: 'http://jabber.org/protocol/disco#items'
		});
		self.client.send(roster);

		console.log('Channel roster request:', roster.toString());


		self.loadCommands();


		self.emit('ready');

	});

	this.count = 0;


	// multi-purpose requests from the server
	this.client.on('stanza', function(stanza) {


		if(typeof stanza.attrs.type !== 'undefined' && stanza.attrs.type === 'error') {
			
			console.error(stanza.toString());

			return ;
		}


		self = new stanzaManager(self, stanza, configs);

		//console.log(self.roster);

	});


	// on error
	this.client.on('error', function(err) {
		console.error(err);
	});


	// disconnect
	this.client.on('end', function() {
		console.log('disconnecting from the server');
	});





	//////////////////////////////////
	///  Extendible functionality  ///
	//////////////////////////////////


	// load commands
	this.loadCommands = function() {

		// add system default commands
		if(configs.custom_commands.indexOf('help') === -1) {
			configs.custom_commands.push('help');
			configs.custom_commands.push('credits');
			configs.custom_commands.push('list');
			configs.custom_commands.push('echo');
			configs.custom_commands.push('roster');
			configs.custom_commands.push('reload');
		}

		//once we are online, we load up our custom commands
		self.commands = commandLoader.load(configs.custom_commands);

	};


	// load configs
	this.loadConfigs = function() {
		 configs = JSON.parse(fs.readFileSync('./config.json'));
	};


	// get roster
	this.getRoster = function() {
		return self.roster;
	};

	// join a channel
	this.joinChannel = function(channel) {

		var channelJoin = new ltx.Element("presence", {
			to: channel + '@chat.livecoding.tv/' + configs.username
		}).c("x", {
			xmlns: 'http://jabber.org/protocol/muc'
		}).c('history', {seconds: 1});
		self.client.send(channelJoin);
		console.log('joined channel "' + channel + '"');

		self.roster = {};
	};


	// leave a channel
	this.leaveChannel = function(channel) {
		
		var channelJoin = new ltx.Element("presence", {
			type: 'unavailable',
			to: channel + '@chat.livecoding.tv/' + configs.username
		}).c("x", {
			xmlns: 'http://jabber.org/protocol/muc'
		});
		self.client.send(channelJoin);
		console.log('left channel "' + channel + '"');

		self.roster = {};
	};


	// send chat message
	this.sendChannelMessage = function(msg) {
		var stanza = new ltx.Element('message', {
			to: configs.channel_username + '@chat.livecoding.tv',
			type: 'groupchat',
			//from: configs.username + '@livecoding.tv'
		}).c('body').t(msg);
		self.client.send(stanza);
	};

}

// give instance an event channel
require('util').inherits(LCTVChatBot, require('events').EventEmitter);

module.exports = LCTVChatBot;

