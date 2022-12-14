const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    res.render('all-posts');
  } catch (err) {
    res.status(500).json(err);
  }
});

//TODO: replace placeholders for login 

// router.get('/login', (req, res) => {
//   if (req.session.loggedIn) {
//     res.redirect('/');
//     return;
//   }

//   res.render('login');
// });

// router.get('/signup', (req, res) => {
//   if (req.session.loggedIn) {
//     res.redirect('/');
//     return;
//   }

//   res.render('signup');
// });

module.exports = router;
