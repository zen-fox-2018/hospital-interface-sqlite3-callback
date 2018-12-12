
const db = require("../db");


class Patient {
    constructor(name, diagnosis) {
      this.name = name
      this.diagnosis = diagnosis
    }

    static findAll() {
    let selectAll = `SELECT * FROM Employees`
        db.all(selectAll, function(err, data) {
            if(err){
                callback(err, null)
            } else {
                let result = []
                for(let i = 0; i < data.length; i++) {
                    let newData = new Patient();
                    result.push(newData)
                }
                callback(null, result)
            }
        })
    }

    static createPatient(input) {
        console.log(input)
        let insertNewEmployee = `INSERT INTO Patients(name, diagnosis)
                                 VALUES ("${input.name}", "${input.diagnosis}");`
        db.run(insertNewEmployee, function(err) {
            if(err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    }
}

module.exports = Patient