const db = require('./db')

let qEmployees = `
CREATE TABLE IF NOT EXISTS Employees
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR,
    password VARCHAR,
    role VARCHAR,
    status INTEGER
)`

let qPatients = `
CREATE TABLE IF NOT EXISTS Patients
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR,
    diagnosis TEXT
)`

db.serialize(() => {
    db.run(qEmployees, (err) => {
        err ? console.log(err): console.log('success make Employees table')
    })
    db.run(qPatients, (err) => {
        err ? console.log(err): console.log('success make Patients table') 
    })
})