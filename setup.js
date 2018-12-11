const db = require('./database/connections.js')

let queryCreateTableEmployee =
    `CREATE TABLE  IF NOT EXISTS Employees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        username TEXT,
        password TEXT,
        role TEXT,
        status INTEGER
        )`

let queryCreateTablePatient =
    `CREATE TABLE  IF NOT EXISTS Patients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        diagnose TEXT
        )`

db.serialize(function (err) {
    if (err) {
        console.log(err)
    } else {
        db.run(queryCreateTableEmployee, function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log('Create Table Employees Succed');

            }
        })
        db.run(queryCreateTablePatient, function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log('Create Table Patients Succed');

            }
        })
    }

})
