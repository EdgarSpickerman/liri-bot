const req = require("request");
const key = require("../config/keys").omdb
const basePath = 'http://www.omdbapi.com/?'

const getParamsString = (title) => {
  if(!title) title="Mr. Nobody";
  return `apikey=${key}&r=json&t=${title}`
};

const makeRequest = (path) => {
  return new Promise((resolve, reject) => {
    req(path, (err, res, body) => err? reject(err) : resolve(JSON.parse(body)))
  })
}

module.exports = (query) => makeRequest(basePath + getParamsString(query));