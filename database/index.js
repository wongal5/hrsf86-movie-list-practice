const Sequelize = require('sequelize');
let db = new Sequelize('moviedb', 'root', null, {dialect:'mysql'});

const Movies = db.define('movies', {
  id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  title: Sequelize.STRING,
  movieId: Sequelize.INTEGER,
  poster: Sequelize.STRING,
  releaseDate: Sequelize.STRING,
  description: Sequelize.STRING(2000)
})

db.sync();

module.exports.Movies = Movies;




