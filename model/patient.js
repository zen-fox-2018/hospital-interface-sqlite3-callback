const db = require('../database/connection.js')


class Patient {
    constructor( name, diagnosis) {
      this.name = name
      this.diagnosis = diagnosis
    }

    static findAll(cb){
        let select = `SELECT * FROM Patients`
        db.all(select, function(err, data){
            if(err){
                cb(err, null)
            }   else{
                cb(null,data)
            }
        })
    }
    
    static insert(patient, cb){
        let query = 
        `INSERT INTO Patients
        VALUES (null, '${patient.name}', '${patient.diagnosis}')`

        db.run(query, function (err){
            if(err){
                cb(err)
            }   else{
                cb(null)
            }
        })
    }

}

module.exports = Patient