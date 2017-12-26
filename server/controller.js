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
    res.json(movies);
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
            db.Movies.create({
              title: movie.title,
              movieId: movie.id,
              poster: movie.poster_path,
              releaseDate: movie.release_date,
              description: movie.overview
            })
          })
          db.Movies.findAll().then(moviesFromDb => {
            console.log('created')
            res.json(moviesFromDb);
          })
        } catch (e) {
          console.error(e.message);
        };
      })
    })
  }
}

  // {
  //   "vote_count": 1560,
  //   "id": 181808,
  //   "video": false,
  //   "vote_average": 7.4,
  //   "title": "Star Wars: The Last Jedi",
  //   "popularity": 765.602056,
  //   "poster_path": "/xGWVjewoXnJhvxKW619cMzppJDQ.jpg",
  //   "original_language": "en",
  //   "original_title": "Star Wars: The Last Jedi",
  //   "genre_ids": [
  //     28,
  //     12,
  //     14,
  //     878
  //   ],
  //   "backdrop_path": "/5Iw7zQTHVRBOYpA0V6z0yypOPZh.jpg",
  //   "adult": false,
  //   "overview": "Rey develops her newly discovered abilities with the guidance of Luke Skywalker, who is unsettled by the strength of her powers. Meanwhile, the Resistance prepares to do battle with the First Order.",
  //   "release_date": "2017-12-13"
  // },
  // {
  //   "vote_count": 7463,
  //   "id": 11,
  //   "video": false,
  //   "vote_average": 8.1,
  //   "title": "Star Wars",
  //   "popularity": 53.499861,
  //   "poster_path": "/btTdmkgIvOi0FFip1sPuZI2oQG6.jpg",
  //   "original_language": "en",
  //   "original_title": "Star Wars",
  //   "genre_ids": [
  //     12,
  //     28,
  //     878
  //   ],
  //   "backdrop_path": "/c4zJK1mowcps3wvdrm31knxhur2.jpg",
  //   "adult": false,
  //   "overview": "Princess Leia is captured and held hostage by the evil Imperial forces in their effort to take over the galactic Empire. Venturesome Luke Skywalker and dashing captain Han Solo team together with the loveable robot duo R2-D2 and C-3PO to rescue the beautiful princess and restore peace and justice in the Empire.",
  //   "release_date": "1977-05-25"
  // },
  // {
  //   "vote_count": 8725,
  //   "id": 140607,
  //   "video": false,
  //   "vote_average": 7.5,
  //   "title": "Star Wars: The Force Awakens",
  //   "popularity": 53.756582,
  //   "poster_path": "/weUSwMdQIa3NaXVzwUoIIcAi85d.jpg",
  //   "original_language": "en",
  //   "original_title": "Star Wars: The Force Awakens",
  //   "genre_ids": [
  //     28,
  //     12,
  //     878,
  //     14
  //   ],
  //   "backdrop_path": "/njv65RTipNSTozFLuF85jL0bcQe.jpg",
  //   "adult": false,
  //   "overview": "Thirty years after defeating the Galactic Empire, Han Solo and his allies face a new threat from the evil Kylo Ren and his army of Stormtroopers.",
  //   "release_date": "2015-12-15"
  // },
  // {
  //   "vote_count": 5807,
  //   "id": 330459,
  //   "video": false,
  //   "vote_average": 7.4,
  //   "title": "Rogue One: A Star Wars Story",
  //   "popularity": 60.904522,
  //   "poster_path": "/qjiskwlV1qQzRCjpV0cL9pEMF9a.jpg",
  //   "original_language": "en",
  //   "original_title": "Rogue One: A Star Wars Story",
  //   "genre_ids": [
  //     28,
  //     12,
  //     878
  //   ],
  //   "backdrop_path": "/tZjVVIYXACV4IIIhXeIM59ytqwS.jpg",
  //   "adult": false,
  //   "overview": "A rogue band of resistance fighters unite for a mission to steal the Death Star plans and bring a new hope to the galaxy.",
  //   "release_date": "2016-12-14"
  // },
  // {
  //   "vote_count": 490,
  //   "id": 12180,
  //   "video": false,
  //   "vote_average": 5.8,
  //   "title": "Star Wars: The Clone Wars",
  //   "popularity": 9.853588,
  //   "poster_path": "/xd6yhmtS6mEURZLwUDT5raEMbf.jpg",
  //   "original_language": "en",
  //   "original_title": "Star Wars: The Clone Wars",
  //   "genre_ids": [
  //     53,
  //     16,
  //     28,
  //     878,
  //     12,
  //     14
  //   ],
  //   "backdrop_path": "/b3w2eXhAZvk79dMtIBTEBf8FXjc.jpg",
  //   "adult": false,
  //   "overview": "Set between Episode II and III the Clone Wars is the first computer animated Star Wars film. Anakin and Obi Wan must find out who kidnapped Jabba the Hutts son and return him safely. The Seperatists will try anything to stop them and ruin any chance of a diplomatic agreement between the Hutt's and the Republic.",
  //   "release_date": "2008-08-05"
  // }