const db = require('../database/connection.js')

class Patient {
    constructor(id, name, diagnosis) {
      this.id = id
      this.name = name
      this.diagnosis = diagnosis
    }

    static findAll(callback){
        const query = `SELECT * FROM Patients `
        db.all(query,function(err,data){
            if(err){
                callback(err,null)
            }else{
                callback(null,data)
            }
        })
    }
    static addPatients(input,callback){
        const query = `INSERT INTO Patients (name, diagnose)
                        VALUES (
                            "${input.name}",
                            "${input.diagnose}"
                        )`
        db.all(query,function(err,data){
            if(err){
                callback(err,null)
            }else {
                callback(null,data)
            }
        })
    }
  }
module.exports = Patient