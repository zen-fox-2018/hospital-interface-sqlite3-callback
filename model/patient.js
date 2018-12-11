var db = require('../database/connection.js');

class Patient {
  constructor(name, diagnosis) {
    this.name = name
    this.diagnosis = diagnosis
  }

  static insert(newPatient, callback) {
    let query = `INSERT INTO Patients (name, diagnosis)
                 VALUES ("${newPatient.name}", "${newPatient.diagnosis}");`;
    db.run(query, callback);
  }

  static count(callback) {
    let query = `SELECT COUNT(*) as count FROM Patients;`;
    db.get(query, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    })
  }
}

module.exports = Patient;