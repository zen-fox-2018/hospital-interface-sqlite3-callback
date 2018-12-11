const openDb = require('../dataB')
const db = openDb()

class Employee {
  constructor(id, name, role, pass, login) {
    this.id = id || 1
    this.username = name
    this.position = role
    this.password = pass 
    this.login = login || 0
  }

  insert(cb) {
    let query = `
      INSERT INTO employees (username, position, password, login) 
      VALUES ("${this.username}", "${this.position}" , "${this.password}" , ${this.login})`

    db.run(query, (err) => {
      cb(err)
    })
  }

  static findAll(cb) {
    let query = `SELECT * FROM employees`
    db.all(query, (err, rows) => {
      if(err) {
        cb(err)
      } else {
        let temp = []
        for (let i = 0; i < rows.length; i++) {
          let newEmp = new Employee(rows[i].id, rows[i].username, rows[i].position, rows[i].password, rows[i].login)
          temp.push(newEmp)
        }
        cb(null ,temp)
      }
    })
  }

  static findOne (field, value, cb) {
    let val;
    if(isNaN(value)) {
      val = `"${value}"`
    } else {
      val = value
    }

    let query = `SELECT * FROM employees WHERE ${field} = ${val}`
    db.get(query, (err, row) =>{
      if(err){
        cb(err)
      } else {
        if(row) {
          let newEmp = new Employee(row.id, row.username, row.position, row.password, row.login)
          cb(null, newEmp)
        } else {
          cb(`\ndata not found`)
        }
      }
    })
  }

  static update(obj, cb){
    let value1;
    let value2;

    if(isNaN(obj.val1)) {
      value1 = `"${obj.val1}"`
    } else {
      value1 = obj.val1
    }

    if (isNaN(obj.val2)) {
      value2 = `"${obj.val2}"` 
    } else {
      value2 = obj.val2
    }

    let query = `UPDATE employees SET ${obj.field1} = ${value1} WHERE ${obj.field2} = ${value2}`

    db.run(query, (err) => {
      if(err) {
        cb(err)
      } else {
        cb(null)
      }
    })
  }

  delete(cb) {
    let query = `DELETE FROM employees WHERE id = ${this.id}`
    db.run(query, (err) => {
      cb(err)
    })
  }
}

module.exports = Employee