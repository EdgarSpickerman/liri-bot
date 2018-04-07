require('dotenv').config();
const getSong = require("../calls/spotify");
const getTweets = require("../calls/twitter");
const getMovie = require("../calls/omdb");
const readFile = require("../calls/file");
const transforms = require("./transforms");
const convertCommandToCall = require("./transforms").convertCommandToCall;

const actions = {
  spotifythissong: (query) => getSong(query),
  moviethis: (query) => getMovie(query),
  mytweets: () => getTweets(),
  dowhatitsays : () => readFile(),
}

const transformData = (data, command) => {
  command = convertCommandToCall(command)
  return transforms[command](data, actions)
};

module.exports = {
  transformData: transformData,
  validateCommands: (command, arr) => arr.includes(command),
  executeCommand: (command, query) => {
    command = convertCommandToCall(command)
    return actions[command](query)
  }
}