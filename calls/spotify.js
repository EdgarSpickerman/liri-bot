const Spotify = require('node-spotify-api')
const key = require("../config/keys").spotify
const spotify = new Spotify(key);

const params = (query) => {
  if (!query) query="The sign, Ace of Base"
  return object = {
    type: "track",
    query: query,
  }
}

module.exports = (query) => spotify.search(params(query));