const db = require('../setup/connection.js')
const fs = require('fs')

class Employee {
  constructor(name, username, password, role) {
    this.name = name
    this.username = username
    this.password = password
    this.role = role
    this.isLogin = 0
  }

  static findAll(callback) {
    const query = `
                  SELECT *
                  FROM Employees;
                  `
    db.all(query, function(err, rows) {
      if (err) {
        callback(err, null)
      } else {
        let newData = []
        for (let i = 0; i < rows.length; i++) {
          let row = rows[i]
          newData.push(new Employee(row.name, row.username, row.password, row.role))
        }
        callback(null, newData)
      }
    })
  }

  static register(name, username, password, role, callback) {
    db.run(`INSERT INTO "Employees" (name, username, password, role, isLogin)
            VALUES (
            "${name}",
            "${username}",
            "${password}",
            "${role}",
            0
            );`, function (err, registeredData) {
      if (err) {
        callback(err, null)
      } else {
        callback(null, registeredData)
      }
    })
  }

  static loggingIn(username, password, callback) {
    this.findAll((err, allData) => {
      if (err) {
        callback(err, null)
      } else {
        this.findSpecificData((err, specificData) => {
          if (err) {
            callback(err, null)
          } else {
            callback(null, specificData)
          }
        })
      }
    })
  }

  static findSpecificData(callback) {
    const qFindData = `
                      SELECT *
                      FROM Employees
                      WHERE Employees.isLogin = 1;
                      `

    db.run(qFindData, (err, data) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, data)
      }
    })
  }

  static updateFile(id, val, callback) {
    const query = `
                  UPDATE Employees
                  SET isLogin = ${val}
                  WHERE id = ${id};
                  `
    db.run(query, (err, dataWithNewValues) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, dataWithNewValues)
      }
    })
  }

  static removeData(id, callback) {
    const deleteQuery = `
                        DELETE FROM Employees
                        WHERE Employees.id = ${id};
                        `
    db.run(deleteQuery, (err, dataRemoved) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, dataRemoved)
      }
    })    
  }
}

Employee.findSpecificData((err, data) => {
  if (err) {
    console.log(err, null)
  } else {
    console.log(null, data)
  }
})

module.exports = Employee
