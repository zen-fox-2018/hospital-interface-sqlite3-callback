const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('hospital.db')

class Patient {
  constructor(name, diagnosis) {
    this.name = name
    this.diagnosis = diagnosis
  }

  create(callback){
    var createPatient = `INSERT INTO Patients
                      (name, diagnose)
                      VALUES
                      ("${this.name}", "${this.diagnosis}")`;
    db.run(createPatient, function(errCreate, data) {
      if (errCreate) {
        callback(errCreate,null);
      }
      else {
        callback(null,data);
      }
    })
  }

  static findAll(callback){
    var query = `SELECT *
                 FROM Patients;`;
    db.all(query, function(errFindAll, data) {
      if (errFindAll) {
        callback(errFindAll, null);
      }
      else {
        callback(null, data);
      }
    })
    // db.close();
  }
}

module.exports = Patient;
