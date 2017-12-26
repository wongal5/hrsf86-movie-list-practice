const app = require('./index.js');
const apiKey = require('../lib/movieAPI.js');
const db = require('../database/index.js');
const http = require('http');

let headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json'
};

let url = `http://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`

let movies = [];

module.exports = {
  getMovies: function(req, res) {
    db.Movies.findAll().then(movies => {
      res.json(movies);
    })
  },
  postMovies: function(req, res) {
    let query = req.body.query.replace(' ', '+');
    apiGet(req, res, url + query, 1);
  },
  optionsMovies: function(req, res) {
    res.set(headers).sendStatus(200);
  },
  getLoad: function(req, res) {
    apiGet(req, res, url + 'Star+Wars', 1);
  },
  getWatchedFlag: function(req, res) {
    db.Movies.update({watchedFlag: req.body.watchedFlag}, { where: { movieId: req.body.movieId }});
    res.sendStatus(204);
  }
}


let apiGet = function(req, res, url, resultsLimit) {
  http.get(url, databaseRes => {
    databaseRes.setEncoding('utf8');
    let rawData = '';
    databaseRes.on('data', (chunk) => { rawData += chunk; });
    databaseRes.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData);
        databaseInsert(parsedData.results, resultsLimit, res);
      } catch (e) {
        console.error(e.message);
      };
    })
  })
}

let databaseInsert = function(data, resultsLimit, res) {
  let lesserLimit = Math.min(resultsLimit, data.length);
  for (let i = 0; i < lesserLimit; i++) {
    db.Movies.findOrCreate({
      where: {
        movieId: data[i].id,
      }, defaults: {
        title: data[i].title,
        poster_path: data[i].poster_path,
        release_date: data[i].release_date,
        vote_average: data[i].vote_average,
        overview: data[i].overview,
        watchedFlag: false
      }
    })
  }
  res.sendStatus(200);
}
