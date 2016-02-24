
module.exports = function(configs) {


	var cheerio = require('cheerio'),
		req = require('request'),
		sleep = require('sleep'),
		sleepa = require('sleep-async')();



	var lastChannel = '';


	// get a list of all the main live streams
	// parse out the needed data and put it in an object
	this.getLiveStreams = function(cb) {

		var url = configs.settings.follow.livestreams_url;

		var channels = [];


		req(url, function(err, res, body) {

			var $ = cheerio.load(body);

			$(configs.settings.follow.streams_selector).each(function(index, item) {
				

				var container = $(this);

				// stream is featured
				var featured = false;
				if(container.find('.browse-main-videos--thumbnail').hasClass('featured')) featured = true;

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
					view_count: view_count,
					featured: featured
				};


				channels.push(channel);
			});

			cb(channels);

		});
	};

}


