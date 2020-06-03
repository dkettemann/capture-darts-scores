var db = require('../config/db.js');
var ChatSchema = require('./chat-schema.js');

var Chat = db.model('Chat', ChatSchema);

module.exports = Chat;