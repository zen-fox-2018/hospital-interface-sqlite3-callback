const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

class Employee {
  constructor(input) {
    this.id = input.id
    this.username = input.username
    this.password = input.password
    this.role = input.role
    this.isLogin = input.isLogin || 0
  }

  static findAll(cb) {
    let query =
    `
      SELECT * FROM Employees;
    `

    db.all(query, function(err, rows) {
      if (err) {
        cb(err)
      }
      else {
        cb(null, rows)
      }
    })
  }

  static findOne(obj, cb) {
    let field = obj.field
    let value = obj.value

    let query =
    `
      SELECT * FROM Employees
      WHERE ${field} = ${value};
    `

    db.get(query, function(err, row) {
      if (err) {
        cb(err)
      }
      else {
        if (row === undefined) {
          cb(null, {})
        }
        else {
          let data = new Employee(row)
          cb(null, data)
        }
      }
    })
  }

  save(cb) {

    const input = Object.values(this).filter(function(element) {
      return element
    })

    let query =
    `
      INSERT INTO Employees
      (username, password, role, isLogin)
      VALUES
      (?, ?, ?, ? );
    `

    db.run(query, input, function(err) {
      if (err) {
        cb(err)
      }
      else {
        cb(null, this)
      }
    })
  }

  update(obj, cb) {
    let query =
    `
      UPDATE Employees
      SET ${obj.field} = ${obj.value}
      WHERE id = ${this.id};
    `
    db.run(query, function(err) {
      if (err) {
        cb(err)
      }
      else {
        cb(null, this)
      }
    })
  }
}

module.exports = Employee