const request = require('superagent');

function RandomeTweet() {
  return request 
    .get('https://ron-swanson-quotes.herokuapp.com/v2/quotes')
    .then(res => res.body)
    .then(({ tweet }) => tweet);
}
module.exports = {
  RandomeTweet
};
