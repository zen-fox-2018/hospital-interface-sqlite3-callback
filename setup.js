const db = require('./database/connection.js')

function setupTableEmployees() {
    let query = `CREATE TABLE
                    employees(
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name text,
                        position varchar(50),
                        username varchar(30),
                        password varchar(30)                        
                    )
                `
    db.run(query, function (err) {
        if (err) {
            console.log(err)
        }
    })
}

function addColumn() {
    let query = `ALTER TABLE employees ADD COLUMN LoginStatus INTEGER`
    db.run(query, function(err){
        if(err){
            console.log(err)
        }
    })
}

function setupTablePatients() {
    let query = `CREATE TABLE
                    Patients(
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name text,
                        diagnosis varchar(50)
                    )
                `
    db.run(query, function (err) {
        if (err) {
            console.log(err)
        }
    })
}

function runSetup(){
    db.serialize(function(){
        setupTableEmployees()
        addColumn()
        setupTablePatients()
    })
}
