var sqlite3 = require('sqlite3').verbose();

function openDb() {
  return new sqlite3.Database(`./hospital.db`);
}



module.exports = openDb 