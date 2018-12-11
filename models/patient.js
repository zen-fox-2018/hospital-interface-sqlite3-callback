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
        ("${data[0]}", "${diagnoses}");
    `;
    db.run(query, (errRun) => {
      if (errRun) {
        callback(errRun);
      } else {
        callback(null);
      }
    })
  }

  static findPatients(search, callback) {
    let whereValues = '';
    for (let i = 0; i < search.length - 1; i+=2) {
      whereValues += `${search[i]} like "%${search[i+1]}%"`;
      if (i < search.length - 2) {
        whereValues += ' AND ';
      }
    }

    const query = `
      SELECT
        *
      FROM
        patients
      WHERE ${whereValues}`

    db.all(query, (err, patients) => {
      if (err) {
        callback(err, null);
      } else {
        let dataPatients = [];
        patients.forEach( e => {
          dataPatients.push(new Patient(e));
        })
        callback(null, dataPatients);
      }
    })
  }

  static findAnPatient(search, callback) {
    let whereValues = '';
    for (let i = 0; i < search.length - 1; i+=2) {
      whereValues += `${search[i]} = "${search[i+1]}"`;
      if (i < search.length - 2) {
        whereValues += ' AND ';
      }
    }

    const query = `
      SELECT
        *
      FROM
        patients
      WHERE ${whereValues}`

    db.all(query, (err, patients) => {
      if (err) {
        callback(err, null);
      } else {
        let dataPatients = [];
        patients.forEach( e => {
          dataPatients.push(new Patient(e));
        })
        callback(null, dataPatients);
      }
    })
  }
}

module.exports = Patient;
