var db = require('../config/db.js');
var DocumentSchema = require('./document-schema.js');

var Document = db.model('Document', DocumentSchema);

module.exports = Document;