const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('/home/razato/Documents/phase1/week3/d2/hospital-interface-sqlite3-callback/database/hospital.db');

module.exports = db