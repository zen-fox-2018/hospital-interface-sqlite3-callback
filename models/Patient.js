const db = require('../db')

class Patient {
    constructor(obj) {
        this.id = obj.id
        this.name = obj.name
        this.diagnosis = obj.diagnosis
    }

    static findAll(cb) {
        let query = `
        SELECT *
        FROM Patients`
        db.all(query, (err, data) => {
            err ? cb({msg: 'err findAll', err: err}): cb(null, data)
        })
    }

    create(cb) {
        let queryCreate = `
        INSERT INTO Patients (name, diagnosis)
        VALUES (?, ?)`
        let input = Object.values(this).filter(e => e)
        db.run(queryCreate, input, function(err) {
            if (err) {
                cb({msg: 'err insert data patient', err: err})
            } else {
                cb(null, this)
            }
        })
    }

}

module.exports = Patient