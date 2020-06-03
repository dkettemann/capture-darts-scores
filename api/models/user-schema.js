var db = require('../config/db.js');
var FolderSchema = require('./folder-schema.js');
var DocumentSchema = require('./document-schema.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//mongoose entity that allows to describe the fields
var UserSchema = db.Schema({
  user_id: { type: Number },
  user_name: {type: String, lowercase: true, required: true },
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String, lowercase: true, required: true },
  token: { type: [String] },
  passhash: { type: String, required: true },
  folders: [{ type: Schema.Types.ObjectId, ref: 'Folder' }],
  documents: [{ type: Schema.Types.ObjectId, ref: 'Document' }],
  chat_id: { type: Schema.Types.ObjectId, ref: 'Chat' }
});

module.exports = UserSchema;
