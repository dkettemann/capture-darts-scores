var db = require('mongoose');

db.connect('mongodb://localhost:27017/<your-database>', { useNewUrlParser: true });


module.exports = db;