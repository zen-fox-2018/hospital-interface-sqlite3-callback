const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./hospital.db')

// db.serialize(function(){
//     const EmployeeTable = `CREATE TABLE 'Employees' (
//                             'id' INTEGER PRIMARY KEY AUTOINCREMENT,
//                             'name' varchar(25),
//                             'position' TEXT,
//                             'username' TEXT,
//                             'password' TEXT
//                             )`

//     const PatientTable = `CREATE TABLE 'Patients' (
//                             'id' INTEGER PRIMARY KEY AUTOINCREMENT,
//                             'name' varchar(25),
//                             'diagnose' varchar(25)
//                             )`

//     db.run(EmployeeTable,function(err){
//         if(err) {
//             console.log(err)
//         }
//     })
//     db.run(PatientTable)

// })

function addColumn() {
    const addColumnInTable = `ALTER TABLE Employees
                              ADD COLUMN isLogin`
    db.run(addColumnInTable,function(err){
        if(err){
            console.log(err)
        }
    })
}

function updateData() {
    const updateDataEmployee = `UPDATE Employees
                                SET isLogin = false`

    db.run(updateDataEmployee,function(err){
        if(err){
            console.log(err)
        }
    })
}

//addColumn()
updateData()