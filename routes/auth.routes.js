const express = require('express'),
  router = express.Router(),
  chalkAnimation = require('chalk-animation'),
  app = express(),
  bcrypt = require("bcrypt"),
  User = require("../models/User.model.js");
// Require user model

// Add bcrypt to encrypt passwords

// Add passport

const ensureLogin = require('connect-ensure-login');
//Add a new GET route to your routes/auth.routes.js file with the path /signup and point it to your views/auth/signup.hbs file.
router.get('/private-page', ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render('passport/private', {
    user: req.user
  });
});

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});
// add a POST route to your routes/auth.routes.js to receive the data from the signup form and create a new user with the data.
router.post('/signup', (req, res) => {
  // console.log(req.body);
  const {
    username,
    password
  } = req.body
  const salt = bcrypt.genSaltSync(12)
  const hashPass = bcrypt.hashSync(password, salt)
  let user = User.create({
    username: username,
    password: hashPass
  })



  res.render('auth/signup', {
    user
  });
  // console.log(user);
});


router.get('/login', (req, res) => {
  res.render('auth/login');
});
router.post('/login', (req, res) => {
  // console.log(req.body);
  const {
    username,
    password
  } = req.body
  console.log(username, password);
  res.render('auth/login', {
    username,
    password
  });
  // console.log(user);
});

module.exports = router;

// app.listen(3000, () => chalkAnimation.rainbow('running on port 3000  🔊'));
