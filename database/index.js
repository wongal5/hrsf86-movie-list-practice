const Sequelize = require('sequelize');
let db = new Sequelize('moviedb', 'root', null, {dialect:'mysql'});

const Movies = db.define('movies', {
  id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  title: Sequelize.STRING,
  movieId: Sequelize.INTEGER,
  poster_path: Sequelize.STRING,
  release_date: Sequelize.STRING,
  vote_average: Sequelize.DECIMAL,
  overview: Sequelize.TEXT,
  watchedFlag: Sequelize.BOOLEAN
})

db.sync();

module.exports.Movies = Movies;

// if mysql isn't starting, make sure you have run mysql.server start in bash



