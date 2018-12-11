var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./hospital.db');

module.exports = db
