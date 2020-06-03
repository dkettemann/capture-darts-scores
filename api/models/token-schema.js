var db = require('../config/db.js');
var User = require('../models/user');
var mongoose = require('mongoose');
var FolderSchema = require('./folder-schema.js');
var Schema = mongoose.Schema;

var TokenSchema = db.Schema({ //Schema.Types.ObjectId
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  token: { type: String, required: true }
})

module.exports = TokenSchema;