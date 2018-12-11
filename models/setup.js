const db = require('./dbConnection')

// let qCreateEmployee = `
//   CREATE TABLE IF NOT EXISTS Employees (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     username text,
//     password text,
//     role text,
//     isLogged INTEGER
//   )`

// let qCreatePatient = `
//   CREATE TABLE IF NOT EXISTS Patients (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name text,
//     diagnosis text
//   )`

// db.serialize( function() {
//   db.run(qCreateEmployee, (err) => {
//     if (err) {
//       console.log(err)
//     }
//   })

//   db.run(qCreatePatient, (err) => {
//     if (err) {
//       console.log(err)
//     }
//   })
// })

// db.close()

// function alterTable() {
//   let query = `
//   ALTER TABLE Employees
//   ADD isLogged
//   SET islogged = INTEGER
//   `
// }

// let query = `
//   UPDATE TABLE Employees
//   SET isLogged = 0
// `