const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

const queryEmployee = `
    CREATE TABLE Employees
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        position TEXT,
        username VARCHAR(6),
        password VARCHAR(6)
    )`

const queryPatient = `
    CREATE TABLE Patients
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        diagnosis TEXT
    )`
function runCommand(input) {
    db.serialize(function() {
        db.run(input, function(err) {
            if (err) {
                console.log(err)
            } else {
                console.log()
            }
        })
    })
}
// runCommand(queryEmployee);
// runCommand(queryPatient);
function alterTable() {
    let query = `
        ALTER TABLE Employees
        ADD COLUMN status TEXT`
    db.run(query, function(err) {
        if (err) {
            console.log(err);
        }
    })
}
alterTable()
module.exports = alterTable;

// db.close();

