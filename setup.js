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

function addColumn (query) {
    db.run(query, function(err) {
        if (err) {
            console.log(`error add column`)
        } else {
            console.log("sukses add column")
        }
    })
}

const createEmployee = 
`CREATE TABLE Employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(50),
    password VARCHAR(20),
    role VARCHAR(20)
)`

const createPatient = 
`CREATE TABLE Patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50),
    diagnosis TEXT
)`

const AlterTable = `
ALTER TABLE Employee
ADD Column login INTEGER`

db.serialize(function () {
    createTable(createEmployee)
    createTable(createPatient)
    alterTable(AlterTable)

})
db.close()