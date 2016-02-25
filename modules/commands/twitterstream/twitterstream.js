
module.exports = function() {
	
	function TweetCommand() {


		var Twitter = require('twitter');

		var isRunning = false,
			turnOff   = false,
			client;


		return {
			name: 'twitterstream',
			params: 'search - the string to search for, --stop - to stop the stream',
			execute: function(data, sandbox) {

				if(!client) {
					client = new Twitter({
						consumer_key: data.configs.settings.twitter.consumer_key,
						consumer_secret: data.configs.settings.twitter.consumer_secret,
						access_token_key: data.configs.settings.twitter.access_token_key,
						access_token_secret: data.configs.settings.twitter.access_token_secret
					});
				}


				turnOff = (data.params.indexOf('--stop') === -1) ? false : true;

			
				if(!turnOff) {

					console.log(data.params);

					client.stream('statuses/filter', {track: data.params}, function(stream) {


						stream.on('data', function(tweet) {

							sandbox.sendChannelMessage('TWITTER - ' + tweet.user.name + ': ' + tweet.text + '\n\n');

							if(turnOff) stream.destroy();
						});


						stream.on('error', function(err) {

							console.error(err);

							stream.destroy();
						});

					});

				}
			}
		};
	}


	return new TweetCommand();

};