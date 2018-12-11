var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('/Users/theresiacoa/Documents/fase1/week3/tuesday/hospital-interface-sqlite3-callback/database/hospital.db');

module.exports = db;