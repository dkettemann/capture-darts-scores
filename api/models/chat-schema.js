var db = require('../config/db.js');
var User = require('../models/user');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatSchema = db.Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  kind: { type: String, required: true }, //could address friends / support / public
  time_created: { type: Date },
  time_received: { type: Date },
  created_by: { type: String },
  name: { type: String } //could be used to address a chat via name resolution 
})

module.exports = ChatSchema;