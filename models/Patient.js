const openDb = require('../dataB')
const db = openDb()

class Patient {
  constructor(id, name, diagnosis ) {
    this.id = id || 1
    this.name = name 
    this.diagnosis = diagnosis
  }

  insert(cb) {
    let query = `
      INSERT INTO patients (name , diagnosis) 
      VALUES ("${this.name}", "${this.diagnosis}" )`

    db.run(query, (err) => {
      cb(err)
    })
  }

  static findAll(cb) {
    let query = `SELECT * FROM patients`
    db.all(query, (err, rows) => {
      if(err) {
        cb(err)
      } else {
        let temp = []
        for (let i = 0; i < rows.length; i++) {
          let newEmp = new Patient(rows[i].id, rows[i].name, rows[i].diagnosis)
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

    let query = `SELECT * FROM patients WHERE ${field} = ${val}`
    db.get(query, (err, row) =>{
      if(err){
        cb(err)
      } else {
        if(row) {
          let newEmp = new Patient(row.id, row.name, row.diagnosis)
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

    let query = `UPDATE patients SET ${obj.field1} = ${value1} WHERE ${obj.field2} = ${value2}`

    db.run(query, (err) => {
      if(err) {
        cb(err)
      } else {
        cb(null)
      }
    })
  }

  delete(cb) {
    let query = `DELETE FROM patients WHERE id = ${this.id}`
    db.run(query, (err) => {
      cb(err)
    })
  }
}

module.exports = Patient