
module.exports = function() {
	
	function TweetCommand() {


		var Twitter = require('twitter');

		var isRunning = false,
			turnOff   = false;


		return {
			name: 'twitterstream',
			params: 'search - the string to search for, --stop - to stop the stream',
			execute: function(data, sandbox) {

				var client = client || new Twitter({
					consumer_key: data.configs.settings.twitter.consumer_key,
					consumer_secret: data.configs.settings.twitter.consumer_secret,
					access_token_key: data.configs.settings.twitter.access_token_key,
					access_token_secret: data.configs.settings.twitter.access_token_secret
				});


				turnOff = (data.params.indexOf('--stop') === -1) ? false : true;

				client.killStream = turnOff;


				// if(isRunning) {
				// 	isRunning = false;

				// 	client.destroy();


				// 	client = client || new Twitter({
				// 		consumer_key: data.configs.settings.twitter.consumer_key,
				// 		consumer_secret: data.configs.settings.twitter.consumer_secret,
				// 		access_token_key: data.configs.settings.twitter.access_token_key,
				// 		access_token_secret: data.configs.settings.twitter.access_token_secret
				// 	});
				// }


				if(typeof client.currentStream !== 'undefined' && turnOff) {

					client.currentStream.destroy();

				}




				//console.log('should we turn off stream?', client.turnOff);
				//console.log('is the stream running?', isRunning);
			

				client.stream('statuses/filter', {track: data.params}, function(stream) {
					
					//isRunning = true;


					client.currentStream = stream;


					stream.on('data', function(tweet) {


						//console.log('should we turn off stream?', turnOff);
						//console.log('is the stream running?', isRunning);


						// console.log(client.turnOff);
						// if(client.turnOff) {
						// 	stream.destroy();

						// 	console.log('turn off?', client.turnOff);

						// 	console.log('destroy stream');

						// 	return ;
						// }


						//stream.destroy();

						
						//console.log(tweet.user, tweet.text);



						sandbox.sendChannelMessage('TWITTER - ' + tweet.user.name + ': ' + tweet.text + '\n\n');



						if(client.killStream) {
							stream.destroy();
						}

					});


					stream.on('error', function(err) {

						console.error(err);

						if(isRunning && turnOff) {
							stream.destroy();

							return ;
						}
					});

				});
			}
		};
	}


	return new TweetCommand();

};