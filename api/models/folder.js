var db = require('../config/db.js');
var FolderSchema = require('./folder-schema.js');

var Folder = db.model('Folder', FolderSchema);

module.exports = Folder;