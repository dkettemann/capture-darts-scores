var db = require('../config/db.js');
var TodoSchema = require('./todo-schema.js');

var Todo = db.model('Todo', TodoSchema);

module.exports = Todo;