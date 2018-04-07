const movieProps = require("../data/movieProps");
const splitString = (string) => string.split(",");
const convertCommandToCall = (command) => command.replace(/[-"]/g, "");

module.exports = {
  convertCommandToCall: convertCommandToCall,
  dowhatitsays: (data, context) => {
    [command, query, ...tail] = splitString(data)
    command = convertCommandToCall(command);
    return context[command](query)
  },
  spotifythissong: (data) => {
    return data.tracks.items
      .map(element => {
        return {
          url: element.preview_url,
          name: element.name,
          album: element.album.name,
          artists: element.artists.map(element => element.name).join(",")
        }
      })
  },
  moviethis: (data) => {
    const parsed = movieProps.reduce((a, v) => {
      return { ...a, [v]: data[v] }
    }, {})
    const { Ratings, imdbID, ...filtered } = parsed
    const link = `http://www.imdb.com/title/${imdbID}/`
    const newRatings = Ratings
      .filter(element => element.Source === "Rotten Tomatoes")
      .map(element => element.Value)
      .join(",")
    return { ...filtered, Ratings: newRatings, link: link }
  },
  mytweets: (data) => data,
}