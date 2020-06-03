var db = require('../config/db.js');
var User = require('./user');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = db.Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  dueDate: {type: String, required: true},
  src_path: { type: String },
  state_active: { type: Boolean},
  kind: { type: String },
  parent_id: { type: String },
  dueTime: {type: String},
  priority: {type: String},
  lastChange: { type: String },
})

module.exports = TodoSchema;