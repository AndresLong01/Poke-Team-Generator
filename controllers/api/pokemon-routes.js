const router = require('express').Router();
const { Pokemon } = require('../../models/');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  const body = req.body;

  try {
    const newPokemon = await Pokemon.create({ ...body, userId: req.session.userId });
    res.json(newPokemon);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;