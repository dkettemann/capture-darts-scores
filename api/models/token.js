var db = require('../config/db.js');
var TokenSchema = require('./token-schema.js');

var Token = db.model('Token', TokenSchema);

module.exports = Token;