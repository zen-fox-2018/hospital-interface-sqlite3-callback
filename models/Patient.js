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
    let query = `SELECT * FROM patients WHERE ${field} = ?`
    db.get(query, [value], (err, row) =>{
      if(err){
        cb(err)
      } else {
        if(row) {
          let newEmp = new Patient(row.id, row.name, row.diagnosis)
          cb(null, newEmp)
        } else {
           cb(null , null)
        }
      }
    })
  }

  static update(obj, cb){
    let query = `UPDATE patients SET ${obj.set} = ? WHERE ${obj.where} = ?`

    db.run(query,[obj.val1, this[obj.where]], (err) => {
      if(err) {
        cb(err)
      } else {
        cb(null)
      }
    })
  }

  delete(cb) {
    let query = `DELETE FROM patients WHERE id = ?`
    db.run(query,[this.id], (err) => {
      cb(err)
    })
  }
}

module.exports = Patient