module.exports = function() {

	var req = require('request');

	
	function GitHubCommand() {


		function getRepo(repo, callback) {
			req({
				url: 'https://api.github.com/repos/' + repo,
				method: 'get',
				headers: {
					'User-Agent': 'Hack Bot v1',
					'Accept': 'application/vnd.github.v3+json'
				}
			}, callback);
		}

		return {
			name: 'github',
			params: '$query = account/repo',
			execute: function(data, sandbox) {

				var msg = '\nGIT HUB:\n';

				getRepo(data.params, function(err, response) {

					if(err) {
						console.error(err);

						return ;
					}

					var repo = JSON.parse(response.body);


					if(repo.message === 'Not Found') {
						console.log('repo ' + data.params + ' was not found');
						msg += 'repo ' + data.params + ' was not found\n\n\n';
						sandbox.sendChannelMessage(msg);

						return ;
					}

					msg += 'id: ' + repo.id + '\n';
					msg += 'name: ' + repo.name + '\n';
					msg += 'language: ' + repo.language + '\n';
					msg += 'description: ' + repo.description + '\n';
					msg += 'url: ' + repo.html_url + '\n';
					msg += 'default branch: ' + repo.default_branch + '\n';
					msg += 'is private: ' + (repo.private ? 'yes' : 'no') + '\n';
					msg += 'size: ' + repo.size + '\n';
					msg += 'open issues: ' + repo.open_issues_count + '\n';
					msg += 'forks: ' + repo.forks_count + '\n';
					msg += 'stars: ' + repo.stargazers_count + '\n';

					msg += '\n\n\n';

					sandbox.sendChannelMessage(msg);
				});
			}
		};
	}


	return new GitHubCommand();

};