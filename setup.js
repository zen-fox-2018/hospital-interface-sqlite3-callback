const db = require('./db/connection');
db.serialize(() => {
  db.run(`DROP TABLE IF EXISTS employees`);
  db.run(`DROP TABLE IF EXISTS patients`);
  // db.run(`DROP TABLE IF EXISTS diagnoses`);
  const qCreateTableEmployees = `
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      username TEXT,
      password TEXT,
      position TEXT,
      isLogin INTEGER
    );
  `;
  db.run(qCreateTableEmployees, (err) => {
    if (err) {
      throw err;
    }
    console.log(`Successfully create table employees`);
  });

  const qCreateTablePatients = `
    CREATE TABLE IF NOT EXISTS patients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      diagnoses TEXT
    );
  `;

  db.run(qCreateTablePatients, (err) => {
    if (err) {
      throw err;
    }
    console.log(`Successfully create table patients`);
  });

  // const qCreateTableDiagnoses = `
  //   CREATE TABLE IF NOT EXISTS diagnoses (
  //     id INTEGER PRIMARY KEY AUTOINCREMENT,
  //     diagnose TEXT,
  //     patientId INTEGER,
  //     FOREIGN KEY (patientId) REFERENCES patients(id)
  //   );
  // `;
  //
  // db.run(qCreateTableDiagnoses, (err) => {
  //   if (err) {
  //     throw err;
  //   }
  //   console.log(`Successfully create table diagnoses`);
  // });


})
