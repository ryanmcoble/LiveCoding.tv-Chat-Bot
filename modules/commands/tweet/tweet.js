
module.exports = function() {
	
	function TweetCommand() {


		var Twitter = require('twitter');


		return {
			name: 'tweet',
			params: 'msg - the message to tweet',
			execute: function(data, sandbox) {

				var client = new Twitter({
					consumer_key: data.configs.settings.twitter.consumer_key,
					consumer_secret: data.configs.settings.twitter.consumer_secret,
					access_token_key: data.configs.settings.twitter.access_token_key,
					access_token_secret: data.configs.settings.twitter.access_token_secret
				});
			

				client.post('statuses/update', {status: data.params}, function(err, tweet, response) {

					if(err) {

						console.error(err);

						var msg = '\nTWEET:\n';

						for(var i = 0; i < err.length; i++) {
							msg += 'ERROR (code ' + err[i].code + '): ' + err[i].message + '\n';
						}

						sandbox.sendChannelMessage(msg + '\n\n\n');

						return ;
					}


					var msg = '\nTWEET:\n';

					msg += tweet.text;


					console.log(tweet);

					
					sandbox.sendChannelMessage(msg + '\n\n\n');

				});
			}
		};
	}


	return new TweetCommand();

};