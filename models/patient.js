const db = require('../db/connection');

class Patient {
  constructor(obj) {
    this.id = obj.id;
    this.name = obj.name;
    this.diagnosis = obj.diagnosis;
  }
  static listAllPatients(callback) {
    const query = `
      SELECT
        *
      FROM
        patients;
    `;

    db.all(query, (err, patients) => {
      if (err) {
        callback(err, null);
      } else {
        let dataPatients = [];
        patients.forEach(e => {
          dataPatients.push(new Patient(e));
        })
        callback(null, dataPatients);
      }
    })
  }

  static createPatient(data, callback) {
    let diagnoses = data.slice(1).join(', ');
    const query = `
      INSERT INTO
        patients (name, diagnoses)
      VALUES
        (?, ?);
    `;
    db.run(query, [data[0],diagnoses], (errRun) => {
      if (errRun) {
        callback(errRun);
      } else {
        callback(null);
      }
    })
  }
}

module.exports = Patient;
