var lctv_chat_bot = require('./modules/lctv_chat-bot.js'),
	fs		  = require('fs'),
	colors	  = require('colors');


var configs = JSON.parse(fs.readFileSync('./config.json'));


var lctv_bot = new lctv_chat_bot(configs);



/*var cheerio = require('cheerio'),
	req = require('request'),
	sleep = require('sleep'),
	sleepa = require('sleep-async')();



var lastChannel = '';


// get a list of all the main live streams
// parse out the needed data and put it in an object
function getLiveStreams(cb) {

	var url = configs.settings.follow.livestreams_url;

	var channels = [];


	req(url, function(err, res, body) {

		var $ = cheerio.load(body);

		$(configs.settings.follow.streams_selector).each(function(index, item) {
			

			var container = $(this);

			// steamer is not featured so lets not worry them
			if(container.find('.browse-main-videos--thumbnail').hasClass('featured')) return;

			// steamer is not live so lets not worry about them
			if(container.find('.browse-main-videos--date').length) return;


			// steamer username
			var username = container.find(configs.settings.follow.streamer_username_selector).attr('href').split('/').join('');

			// stream title
			var title = container.find(configs.settings.follow.streamer_title_selector).text();

			// streamer country
			var country = container.find(configs.settings.follow.streamer_country_selector).attr('data-title');

			// stream tag
			var tag = container.find(configs.settings.follow.streamer_tags_selector).text();

			// stream view count
			var view_count = parseInt(container.find(configs.settings.follow.streamer_view_count_selector).text().trim());


			var channel = {
				username: username,
				title: title,
				country: country,
				tag: tag,
				view_count: view_count
			};


			channels.push(channel);
		});

		cb(channels);

	});
}




// switch sleep functionality to non-blocking version

lctv_bot.on('ready', function() {

	// get all live streams
	getLiveStreams(function(channels) {

		//console.log(channels);
		//return ;


		channels.forEach(function(channel) {

			console.log('\n\n\n\nchannel selected: "' + channel.username + '"');

			console.log(channel);

			console.log('waiting 10 seconds to join channel...');
			
			// connect to channel
			lctv_bot.joinChannel(channel.username);

			sleepa.sleep(1000 * 10, function() {


				console.log('waiting 20 seconds to get the full roster')
				// wait 5 seconds, so we can be sure all clients are recognized
				//sleepa.sleep(1000 * 20, function() {

					var roster = lctv_bot.getRoster();
					console.log(roster);

					var userFound = false;

					// loop through the roster looking to the user name in question
					for(var j in roster) {
						var user = roster[j];

						if(user.name === configs.settings.follow.username) {

							// user found
							userFound = true;

							console.log('The user has been found');
							break;
						}

					}
				//});

			});


			// disconnect from channel
			lctv_bot.leaveChannel(channel.username);


			sleep.sleep(20);

		});


	});

});
*/



















