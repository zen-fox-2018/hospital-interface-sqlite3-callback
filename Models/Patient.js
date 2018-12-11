const db = require('./Connect to Database');
class Patient {
    constructor(name, diagnosis) {
      this.name = name
      this.diagnosis = diagnosis
    }
    static addNewPatient(name, diagnosis, dataEmployee,callback) {
        let isDoc = false;
            for (let i = 0; i <= dataEmployee.length-1; i++) {
                if (dataEmployee[i].status === 'on' && dataEmployee[i].position === "dokter") {
                    isDoc = true;
                }
            }
            if (isDoc === true) {
                Patient.createPatientList(name, diagnosis, function(err) {
                    if (err) {
                        callback(err)
                    } else {
                        Patient.findAllPatient(function(err, dataPatient) {
                            if (err) {
                                callback(err, null)
                            } else {
                                let theList = []
                                for (let i = 0;  i <= dataPatient.length-1; i++) {
                                    let list = new Patient(dataPatient[i].name, dataPatient[i].diagnosis);
                                     theList.push(list);
                                }
                                callback(null, theList)
                            }
                        })
                    }
                })
            } else {
                callback(false, null);
                
            }
        
    }

    static findAllPatient(callback) {
        let query = `SELECT * FROM Patients`
        db.all(query, function(err, dataPatient) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, dataPatient)
            }
        })
    }
    static createPatientList(name, diagnosis, callback) {
        let disease = diagnosis.join(", ")
        let query = `
        INSERT INTO Patients 
            (name, diagnosis)
        VALUES
        ("${name}", "${disease}")
        `
      db.run(query, function(err) {
        if (err) {
          callback(err)
        } else {
          callback()
        }
      })
    }
}

module.exports = Patient;