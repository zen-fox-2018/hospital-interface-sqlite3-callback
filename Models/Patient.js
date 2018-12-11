const db = require(`../db`)

class Patient {
    static registerPatient(name, disease, cb) {
        const query = `INSERT INTO Patients (
            name,
            disease
        ) VALUES (
            "${name}",
            "${disease.join(`, `)}"
        );`
        db.run(query, function (err) {
            err ?
                cb(err, null) :
                cb(null, this)
        })
    }

    static create(name, disease, cb) {
        let insertQuery = `INSERT INTO Patients (
            name, disease
        ) VALUES (
            "${name}", "${disease}"
        )`
        db.run(insertQuery, function (err) {
            err ?
                cb(err, null) :
                cb(null, this)
                
        })
    }

}

module.exports = Patient