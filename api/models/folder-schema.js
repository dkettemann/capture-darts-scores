var db = require('../config/db.js');
var User = require('../models/user');
var mongoose = require('mongoose');
var FolderSchema = require('./folder-schema.js');
var DocumentSchema = require('./document-schema.js');
var Schema = mongoose.Schema;

var FolderSchema = db.Schema({ //Schema.Types.ObjectId
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  parent_id: { type: String }, //{ type: Schema.Types.ObjectId, ref: 'Folder'},
  name: { type: String, required: true },
  path: { type: String },
  kind: { type: String },
  lastChange: { type: Date },
  subfolders: [{ type: Schema.Types.ObjectId, ref: 'Folder' }],
  documents: [{ type: Schema.Types.ObjectId, ref: 'Document' }],
  status: { type: String, required: true }
})

module.exports = FolderSchema;