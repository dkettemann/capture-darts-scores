var router = require('express').Router();
var bcrypt = require('bcryptjs');
var User = require('../models/user');
var Chat = require('../models/chat');
var jwt = require('jsonwebtoken');
var constants = require('../config/constants');
var mongoose = require('mongoose');
var shared = require('../shared/shared');

router.post('/', (req, res) => {
  var ld = {
    method: "/users",
    user: req.body.user_id,
    log: shared.log,
    error: shared.error
  }
  //user = {user_id, user_name, first_name, last_name, email, passhash}
  User.find({ 'user_name': req.body.user.user_name }).then((user) => {
    if (user == []) {
      res.json({
        user: {},
        message: 'failed: Username already taken',
        sessionToken: ''
      });
    }
  })
  var user = new User({
    user_name: req.body.user.user_name.toLowerCase(),
    passhash: bcrypt.hashSync(req.body.user.password, 10),
    first_name: req.body.user.first_name,
    last_name: req.body.user.last_name,
    email: req.body.user.email,
    folders: [],
    documents: []
  });


  user.save().then(
    //when the promise resolves
    (newuser) => { //
      var sessionToken = jwt.sign({ data: newuser._id },
        constants.JWT_SECRET,
        { expiresIn: 60 * 60 * 24 });
      res.json({
        user: newuser,
        message: 'success',
        sessionToken: sessionToken
      });
      constants.USERNAME = req.body.user.user_name;
      constants.USER_ID = newuser._id;
    },
    (err) => {
      res.send(500, err.message)
    }
  )
});

module.exports = router;