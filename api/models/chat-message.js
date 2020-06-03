var db = require('../config/db.js');
var ChatMessageSchema = require('./chat-message-schema.js');

var ChatMessage = db.model('ChatMessage', ChatMessageSchema);

module.exports = ChatMessage;