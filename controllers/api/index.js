const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const pokemonRoutes = require('./pokemon-routes.js');

router.use('/user', userRoutes);
router.use('/pokemon', pokemonRoutes);

module.exports = router;