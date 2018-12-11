const fs = require('fs')
const db = require('./dbConnection')

class Employee {
  constructor(id, username, password, role, isLogged = 0) {
    this.id = id
    this.username = username
    this.password = password
    this.role = role
    this.isLogged = isLogged
  }

  static findAll(callback) {
    let query = `
      SELECT * FROM Employees
    `
    db.all(query, (errDB, rows) => {
      if (errDB) {
        callback(errDB, null)
      } else {
        let employeeData = []
        for( let i = 0 ; i < rows.length ; i++ ) {
          let id = rows[i].id
          let username = rows[i].username
          let pass = rows[i].password
          let role = rows[i].role
          let isLogged = rows[i].isLogged
          employeeData.push(new Employee(id, username, pass, role, isLogged))
        }
        callback(null, employeeData)
      }
    })
  }

  static findOne(column, callback) {
    let query = `
      SELECT * FROM Employees
      WHERE "${column[0]}" = "${column[1]}"
    `

    db.get(query, (errOne, rows) => {
      if (errOne) {
        callback(errOne, null)
      } else if (rows) {
        let id = rows.id
        let username = rows.username
        let pass = rows.password
        let role = rows.role
        let isLogged = rows.isLogged
        let alreadyExists = new Employee(id, username, pass, role, isLogged)
        callback(null, alreadyExists)
      } else if (rows === undefined) {
        callback(null, rows)
      }
    })
  }

  static count() {
    let query = `
      SELECT COUNT(*)
      FROM Employees
    `
  }

  static create(arrayData, callback) {
    let query = `
      INSERT INTO Employees (username, password, role, isLogged)
      VALUES ("${arrayData[0]}", "${arrayData[1]}", "${arrayData[2]}", 0)
    `
    
    db.run(query, (err) => {
      if (err) {
        callback(err, null) // create gagal
      } else {
        let obj = new Employee(null, arrayData[0], arrayData[1], arrayData[2])
        callback(null, obj) //create berhasil
      }
    })

  }

  static update(where, set, callback) {
    let query = `
      UPDATE Employees
      SET "${set[0]}" = "${set[1]}"
      WHERE "${where[0]}" = "${where[1]}"
    `

    db.run(query, (err) => {
      if (err) {
        callback(err)
      } else {
        callback(null)
      }
    })
  }

}

module.exports = Employee