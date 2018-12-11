
const db = require("./db");

db.serialize(function() {
    // let createTableEmployee = `CREATE TABLE IF NOT EXISTS Employees (
    //     id INTEGER PRIMARY KEY AUTOINCREMENT,
    //     name TEXT,
    //     position VARCHAR(10),
    //     username VARCHAR(10),
    //     password VARCHAR(10),
    //     islogin INTEGER NOT NULL,
    //     UNIQUE(username)
    // );`

    // db.run(createTableEmployee, function(err) {
    //     if(err) {
    //         console.log(err)
    //     } else {
    //         console.log("Successfully created employee table!")
    //     }
    // })

    let createTablePatient = `CREATE TABLE IF NOT EXISTS Patients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        diagnosis TEXT
    );`

    db.run(createTablePatient, function(err) {
        if(err) {
            console.log(err)
        } else {
            console.log("Successfully created Patient table!")
        }
    })
})