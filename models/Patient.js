const db = require('./dbConnection.js')

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }

  static findAll(callback) {
    let query = `
      SELECT * FROM Patients
    `

    db.all(query, (err, rows) => {
      if (err) {
        console.log(err, null)
      } else {
        let patientData = []
        rows.forEach( a => {
          let id = a.id
          let name = a.name
          let diagnosis = a.diagnosis
          patientData.push(new Patient(id, name, diagnosis))
        })
        callback(null, patientData)
      }
    })
  }

  static create(arrayData, callback) {
    let query = `
      INSERT INTO Patients (name, diagnosis)
      VALUES ("${arrayData[0]}", "${arrayData[1]}")
    `
    
    db.run(query, (err) => {
      if (err) {
        callback(err, null) // create gagal
      } else {
        let obj = new Patient(null, arrayData[0], arrayData[1])
        callback(null, obj) //create berhasil
      }
    })

  }
}

module.exports = Patient

// Patient.findAll( (err, patientData) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(patientData.length)
//   }
// })