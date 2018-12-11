const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('hospital.db');

function setupEmployees(){
    var createSetup = `CREATE TABLE
                        Employees (
                          id INTEGER PRIMARY KEY AUTOINCREMENT,
                          username TEXT,
                          password TEXT,
                          role TEXT)`;
    db.run(createSetup, function(errSetup) {
      if (errSetup) {
        console.log('EMPLOYEES:',errSetup);
      }
      else {
        console.log('Employees table created!');
      }
    })
  db.close();
}

function setupPatients(){
  var createTable = `CREATE TABLE
                      Patients (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name TEXT,
                        diagnose TEXT)`;
  db.run(createTable, function(errCreate) {
    if (errCreate) {
      console.log('PATIENTS:',errCreate);
    }
    else {
      console.log('Patients table created!');
    }
  })
  db.close();
}

function alterIsLogin(){
  var alter = `ALTER TABLE Employees
              ADD COLUMN isLogin TEXT;`;
  db.run(alter, function (errAlter)){
    if (errAlter) {
      console.log('ALTER:', errAlter);
    }
    else {
      console.log('Alter done!');
    }
  }
}

setupEmployees();
setupPatients();
alterIsLogin();
