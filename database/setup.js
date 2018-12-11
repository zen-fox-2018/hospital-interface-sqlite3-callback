const db = require('./connection.js');

function dbRun(query) {
  db.run(query, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('table created!');
    }
  })
}

db.serialize(() => {

  function employeeTable() {
    dbRun(
      `CREATE TABLE IF NOT EXISTS Employees (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name VARCHAR(50),
          position VARCHAR(10),
          username VARCHAR(15),
          password VARCHAR(20)
       );`
    );
  }

  function patientTable() {
    dbRun(
      `CREATE TABLE IF NOT EXISTS Patients (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name VARCHAR(50),
          diagnosis TEXT
       );`
    );
  }

  employeeTable();
  patientTable();
})

function alterTable() {
  let query = `
        ALTER TABLE Employees
        ADD COLUMN isLogin TEXT;`; 
  dbRun(query);
}
alterTable();