const router = require('express').Router();
const { Pokemon, User } = require('../../models/');
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

router.get('/check-if-exists/:pokeName', withAuth, async(req, res) => {
  try {
    const user = await User.findByPk(req.session.userId, { include: [{ model: Pokemon }]});

    console.log(req.params.pokeName, user.Pokemons);
  
    if (user.Pokemons.find(el => el.pokeName === req.params.pokeName)) {
      res.status(200).json({
        addToDb: false,
        ok: true,
        msg: 'This pokemon already exists in your db.'
      });
    }
    else {
      res.status(200).json({
        addToDb: true,
        ok: true,
        msg: 'Pokemon can be added to db.'
      })
    }
  }
  catch(err) {
    res.status(500).json(err);
  }
})

module.exports = router;