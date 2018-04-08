const movieProps = require("../data/movieProps");
const songProps = require("../data/songProps");
const splitString = (string) => string.split(",");
const convertCommandToCall = (command) => command.replace(/[-"]/g, "");

const rottenTomator = (rating) => {
  return rating
    .filter(ele => ele.Source === "Rotten Tomatoes")
    .map(ele => ele.Value)
    .join(",")
}

const parseSong = (element, list = songProps) => {
  return element.map(ele => {
    const { artists, album, ...fl} = ele.parseByKeyList(list);
    const artistList = artists.map(ele => ele.name).join(",");
    return { ...fl, artists: artistList,album: album.name}
  })
}

const parseMovie = (data, list = movieProps) => {
  const {Ratings,imdbID,...filtered} = data.parseByKeyList(list);
  const link = `http://www.imdb.com/title/${imdbID}/`
  const newRatings = rottenTomator(Ratings);
  return { ...filtered,
    Ratings: newRatings,
    link: link
  }
}

const parseTweet = (data, list = ["created_at","text"]) => {
  return data.map(obj => obj.parseByKeyList(list))
}

const parseFile = (data) => {
  [command, query, ...tail] = splitString(data)
  command = convertCommandToCall(command);
  return [command, query]
}

Object.prototype.parseByKeyList = function (list) {
  return list.reduce((a, v) => {
    return { ...a,[v]: this[v]}
  }, {})
}

module.exports.parseSong = parseSong;
module.exports.parseMovie = parseMovie;
module.exports.parseTweet = parseTweet;
module.exports.parseFile = parseFile;
module.exports.convertCommandToCall = convertCommandToCall;