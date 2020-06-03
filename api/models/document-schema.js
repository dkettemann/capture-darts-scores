var db = require('../config/db.js');
var User = require('../models/user');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DocumentSchema = db.Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  parent_id: { type: String }, //{ type: Schema.Types.ObjectId, ref: 'Folder'},
  name: { type: String, Stringuired: true },
  link: { type: String },
  kind: { type: String, required: true },
  path: { type: String },
  src_path: { type: String },
  lastChange: { type: Date },
  status: { type: String, required: true }
})

module.exports = DocumentSchema;