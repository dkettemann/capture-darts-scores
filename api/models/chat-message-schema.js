var db = require('../config/db.js');
var User = require('../models/user');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatMessageSchema = db.Schema({
  sender_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  chat_id: { type: String, required: true }, //could address support or friends
  message: { type: String },
  time_sent: { type: Date },
  time_received: { type: Date },
  status: { type: String } //received
})

module.exports = ChatMessageSchema;