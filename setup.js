const db = require('./db.js')

function createTable (query) {
    db.run(query , function (err) {
        if (err) {
            console.log("error di create Table",err)
        } else {
            console.log('berhasil create table')
        }
    })
}

const createEmployee = 
`CREATE TABLE Employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(50),
    password VARCHAR(20),
    role VARCHAR(20),
    login INTEGER
)`

const createPatient = 
`CREATE TABLE Patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50),
    diagnosis TEXT
)`

db.serialize(function () {
    createTable(createEmployee)
    createTable(createPatient)
})
db.close()