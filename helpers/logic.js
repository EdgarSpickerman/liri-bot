require('dotenv').config();
const util = require('util')
const getSong = require("../calls/spotify");
const getTweets = require("../calls/twitter");
const getMovie = require("../calls/omdb");
const readFile = require("../calls/file");
const transforms = require("./transforms");
const validCommands = require("../data/commands");
const validateCommands = (command, arr) => arr.includes(command);

const actions = {
  spotifythissong: (query) => {
    return getSong(query)
     .then(data=>transforms.parseSong(data.tracks.items))
  },
  moviethis: (query) => {
    return getMovie(query)
      .then(data=>transforms.parseMovie(data))
  },
  mytweets: (query) => {
    return getTweets()
     .then(data=>parseTweet(data))
  },
  dowhatitsays: (query) => {
    return readFile()
      .then(data=>transforms.parseFile(data))
      .then(data=>executeCommand(data[0],data[1]))
  },
}

const executeCommand = (command, query) => {
  command = transforms.convertCommandToCall(command)
  return actions[command](query)
}

module.exports.executeCommand = executeCommand;
module.exports.validateCommands = validateCommands;
module.exports.validCommands = validCommands;