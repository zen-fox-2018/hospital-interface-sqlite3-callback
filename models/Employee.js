const db = require('../database/connection.js')
// const fs = require('fs')

class Employee {
    constructor(name, position, username, password, loginStatus) {
      this.name = name
      this.position = position
      this.username = username
      this.password = password
      this.loginStatus = loginStatus
    }

    static update(namaKolom, value, id, cb){
        //value adalah integer
        let query = `UPDATE employees SET "${namaKolom}" = ${value} where id = ${id}`
        db.run(query,function(err){
            if(err){
                cb(err)
            }
            else {
                cb(null)
            }
        })
    }
    

    static readEmployee(cb){
        let query = `SELECT * FROM employees`
        db.all(query, function(err,rows){
            if(err) {
                cb(err,null)
            }
            else {
                cb(null,rows)
            } 
        } )
    }

    static findEmployeeById(id,cb) {
        let query = `SELECT * FROM employees WHERE id = ${id}`
        db.all(query, function(err,rows){
            if(err){
                cb(err,null)
            }
            else{
                cb(null,rows)
            }
        })
    }

    static addEmployee(newEmployee,cb){
        //asumsi newEmployee bentuknya adalah objek class
        let query = `INSERT INTO employees(name, position, username, password, loginStatus)
                    VALUES (
                        "${newEmployee.name}",
                        "${newEmployee.position}",
                        "${newEmployee.username}",
                        "${newEmployee.password}",
                        ${newEmployee.loginStatus}
                    )`
        db.run(query, function(err){
            if(err){
                cb(err)
            } 
            else {
                cb(null)
            }
        })
    }

  }

module.exports = Employee

//   Employee.readEmployee(function(err,rows){
//       if(err){
//           console.log(err)
//       }
//       else {
//           console.log(rows)
//       }
//   })


