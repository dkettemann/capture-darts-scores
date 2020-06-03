var db = require('../config/db.js');
var UserSchema = require('./user-schema.js');
var FolderSchema = require('./folder-schema.js');
var User = db.model('User', UserSchema);

module.exports = User;