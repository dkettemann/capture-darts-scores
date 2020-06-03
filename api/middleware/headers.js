var router = require('express').Router();

module.exports = (req, res, next) => {
  res.header('access-control-allow-origin', '*');
  res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE');
  res.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  //make express carry on to the next method
  next();
};

module.exports = router;