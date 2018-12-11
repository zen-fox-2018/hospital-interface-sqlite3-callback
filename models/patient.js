const fs = require('fs');
const db = require('../dbConnect.js');
const Controller = require('../controller.js');

class Patient {
    constructor(name, diagnosis) {
        this.name = name;
        this.diagnosis = diagnosis;
    }

    static findAll(callback) {
        let qSearch =
            `SELECT
          *
         FROM
          Patients;
        `;

        db.all(qSearch, (err, patients) => {
            if (err) {
                callback(err, null);
            } else {

                let data = [];
                for (let i = 0; i < patients.length; i++) {
                    data.push(new Patient(patients[i].name, patients[i].diagnosis));
                }
                callback(null, patients);
            }
        });
    }

    static addData(name, diagnosis, callback) {
        let qAddData =
            `INSERT INTO
         Patients (name, diagnosis)
         VALUES ("${name}", "${diagnosis}");
        `;

        db.run(qAddData, (err) => {
            if (err) {
                callback(err);
            } else {
                callback();
            }
        });
    }

}

module.exports = Patient;