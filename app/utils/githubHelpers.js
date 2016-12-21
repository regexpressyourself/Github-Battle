var axios = require('axios');
var id    = process.env.REACT_APP_GITHUB_UN;
var sec   = process.env.REACT_APP_GITHUB_PW;
var id    = "af374a87e4389625a0a0";
var sec   = "86019d6cbf6f0a91fdfc78f9edf190aa57ebf23d";
var param = "?client_id=" + id + "&client_secret=" + sec;

function getUserInfo(username) {
    return axios.get('https://api.github.com/users/' + username + param);
}

function getRepos (username) {
    return axios.get('https://api.github.com/users/' + username + '/repos' +param + '&per_page=100');
}

function getTotalStars (repos) {
    return repos.data.reduce(function(prev, current) {
        return prev + current.stargazers_count;
    }, 0);
}

function getPlayersData (player) {
    console.log(player);
    return getRepos(player.login)
        .then(getTotalStars)
        .then(function (totalStars) {
            return {
                followers: player.followers,
                public_repos: player.public_repos,
                totalStars: totalStars
            }
        });
}

function calculateScores (players) {
    return[
        players[0].followers * 3 + players[0].totalStars + players[0].public_repos,
        players[1].followers * 3 + players[1].totalStars + players[1].public_repos
    ]
}
var helpers = {
    getPlayersInfo: function (players){
        return axios.all(players.map(function (username) {
            return getUserInfo(username);
        })).then(function (info) {
            return info.map(function (user) {
                return user.data;
            });
        }).catch(function (err) {
            console.warn('Error in getPlayersInfo', err);
        });
    },
    battle: function (players){
        var playerOneData = getPlayersData(players[0]);
        var playerTwoData = getPlayersData(players[1]);
        return axios.all([playerOneData, playerTwoData])
                    .then(calculateScores)
                    .catch(function (err) {
                        console.warn('Error in getPlayersInfo: ', err);
                    });

    }
};
module.exports = helpers;
