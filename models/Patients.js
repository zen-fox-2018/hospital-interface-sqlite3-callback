const db = require('../db.js')

class Patients {
    constructor(name, diagnose) {
        this.name = name
        this.diagnose = diagnose
    }

    static findAll(cb) {
        let query = `SELECT * FROM Patients`

        db.all(query, function(err, data) {
            if(err) {
                cb(err)
            } else {
                let newData = []
                for(let i = 0; i < data.length; i++) {
                    let patients = new Patients(data[i].name, data[i].diagnose)
                    newData.push(patients)
                }
                cb(null, newData)
            }
        })
    }

    static findOne(options, cb) {
        let query = `SELECT * FROM Patients WHERE ${options.field}  = "${options.value}"`
        db.get(query, function(err, row) {
            if(err) {
                cb(err, null)
            } else {
                if(!row) {
                    cb(null, null)
                } else {
                    let patients = new Patients(row.name, row.diagnose)
                    cb(null, patients)
                }
            }
        })
    }

    static create(input, cb) {
        let patients = new Patients(input.name, input.diagnose)
        let query = 
        `INSERT INTO Patients (name, diagnose)
        VALUES ("${patients.name}", "${patients.diagnose}")`

        db.run(query, function(err) {
            if(err) {
                cb(err)
            } else {
                cb(null)
            }
        })
    }

    static update(input, cb) {
        let query = `UPDATE Patients SET ${input.field} = "${input.value}" WHERE username = "${input.username}"`
        db.run(query, function(err) {
            if(err) {
                cb(err)
            } else {
                cb(null)
            }
        })
    }

    static delete(input, cb) {
        let query = `DELETE FROM Patients Where id = ${input}`

        db.run(query, function(err) {
            if(err) {
                cb(err)
            } else {
                cb(null)
            }
        })
    }

}

module.exports = Patients