const db = require('../database/connection.js')

class Patient {
  constructor(name, diagnosis) {    
    this.name = name
    this.diagnosis = diagnosis
  }

  static readPatient(cb) {
    let query = `SELECT * FROM Patients`
    db.all(query, function (err, rows) {
      if (err) {
        cb(err, null)
      }
      else {
        cb(null, rows)
      }
    })
  }

  static addPatient(newPatient, cb) {
    //asumsi newPatient bentuknya adalah objek class
    let query = `INSERT INTO Patients(name, diagnosis)
                VALUES (
                    "${newPatient.name}",
                    "${newPatient.diagnosis}"                    
                )`
    db.run(query, function (err) {
      if (err) {
        cb(err)
      }
      else {
        cb(null)
      }
    })
  }

}

module.exports = Patient
