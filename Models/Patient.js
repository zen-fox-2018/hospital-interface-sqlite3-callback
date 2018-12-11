const db = require('../db')

class Patient {
    constructor(id, name, diagnosa) {
        this._id = id;
        this._name = name;
        this._diagnosa = diagnosa ;
    }

    create (callback) {
        let query = `INSERT INTO Patients (name, diagnosis )
                    VALUES (?, ?)`
        let input = Object.values(this).filter(x => x !== null)
        db.run(query,input , function(err) {
            if (err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    }

    static findAll (callback) {
        let query = `SELECT * FROM Patients `
        db.all(query, function (err, rows) {
            if (err) {
                callback(err)
            } else {
                let data = []
                rows.forEach(person => {
                    let Patient = new Patient(person.id, person.name, person.diagnosa)
                    data.push(Patient)
                });
                callback(null, data)
            }
         })
    }

    static findWhere (object, callback) {
        let query = `SELECT * FROM Patients WHERE ${object.field} = ? `
        let input = [object.value]
        db.get(query,input, function(err, row) {
            if (err) {
                callback(err)
            } else {
                if (row) {
                    let patient = new Patient(row.id, row.name, row.diagnosa)
                    callback(null, employee)
                } else {
                    callback(null, `${object.field} with value ${object.value} is not found`)
                }
            } 
        })
    }

    static delete (input, callback) {
        let query = `DELETE FROM Patients 
                    WHERE ${input.field} = ?`
        db.run(query,[input.value],  function(err) {
            if (err) {
                callback(err)
            } else {
                callback(this)
            }
        })
    }

    static countPatient(callback) {
        let query = `SELECT COUNT(*) AS totalPatient FROM Patients`
        db.all(query, function (err, rows) {
            if (err) {
                callback(err)
            } else {
                callback(null, rows)
            }
        })
     }
 
     update(object,callback) {
         let query = `UPDATE Patients
                     SET ${object.field} = ?
                     WHERE id = ? `
         let input = [object.value, this._id]
         db.run(query, function(err) {
             if (err) {
                 callback(err)
             } else {
                 callback(this)
             }
         })
     }
}

module.exports = Patient