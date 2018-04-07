const Twitter = require("twitter");
const key = require("../config/keys").twitter
const client = new Twitter(key);

const params={
  count:20,
}

module.exports = () => client.get('statuses/user_timeline', params)