# liri-bot
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

## Getting Started

Please go to the following sites if you do no have api keys to spotify or twitter.
  * Twitter <https://apps.twitter.com/app/new>
  * Spotify <https://developer.spotify.com/my-applications/#!/>

Please add a file named `.env` to the root directory with the following code.
```
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

# Twitter API keys

TWITTER_CONSUMER_KEY=your-twitter-consumer-key
TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret
TWITTER_ACCESS_TOKEN_KEY=your-access-token-key
TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret

# OMDB API keys

OMDB_APIKEY="trilogy"

```

Add your api keys to the `.env` file.

## Valid Commands
```
my-tweets
spotify-this-song song name
movie-this movie
do-what-it-says
```
## Running Liri Examples
  ```
  node liri.js spotify-this-song all the small things
  node liri.js my-tweets
  node liri.js movie-this The matrix
  node liri.js do-what-it-says
  ```