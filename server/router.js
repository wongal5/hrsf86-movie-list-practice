var controller = require('./controller');
var router = require('express').Router();

router.get('/movies', controller.getMovies);
router.post('/movies', controller.postMovies);
router.options('/movies', controller.optionsMovies);
router.get('/load', controller.getLoad)
router.post('/watchedFlag', controller.getWatchedFlag);

module.exports = router;