const router = require('express').Router();
const withAuth = require('../utils/auth');
const { User, Pokemon } = require('../models')

router.get('/', async (req, res) => {
  try {
    res.render('splash-page');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    res.render('dashboard', {
      front: {
        homepage: true,
        loggedIn: true
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.userId, {
      include: [
        Pokemon
      ]
    })

    const user = userData.get({ plain: true });
    console.log(user)

    res.render('profile', {
      user,
      front: {
        profile: true,
        loggedIn: true
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login', {login: true});
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup', {signup: true});
});

module.exports = router;
