const app = require('./index.js');
const apiKey = require('../lib/movieAPI.js');
const db = require('../database/index.js');
const http = require('http');

let headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json'
};

let url = `http://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=Star+Wars`

let movies = [];

module.exports = {
  getMovies: function(req, res) {
    db.Movies.findAll().then(movies => {
      res.json(movies);
    })
  },
  postMovies: function(req, res) {
    // not currently doing anything with posted info.
    console.log(req.body);
    res.sendStatus(201)
  },
  optionsMovies: function(req, res) {
    res.set(headers).sendStatus(200);
  },
  getLoad: function(req, res) {
    http.get(url, databaseRes => {
      databaseRes.setEncoding('utf8');
      let rawData = '';
      databaseRes.on('data', (chunk) => { rawData += chunk; });
      databaseRes.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData);
          parsedData.results.forEach(movie => {
            db.Movies.findOrCreate({ where: {
              movieId: movie.id,
            }, defaults: {
              title: movie.title,
              poster_path: movie.poster_path,
              release_date: movie.release_date,
              vote_average: movie.vote_average,
              overview: movie.overview,
              watchedFlag: false
            }})
          })
          res.sendStatus(200);
        } catch (e) {
          console.error(e.message);
        };
      })
    })
  },
  getWatchedFlag: function(req, res) {
    console.log('REQUEST BODY =====, ', req.body);
    db.Movies.update({watchedFlag: req.body.watchedFlag}, { where: { movieId: req.body.movieId }});
    res.sendStatus(204);
  }
}