const db = require('../database/connector')

class Patient {
    constructor(obj) {
      this.id = obj['id']
      this.name = obj['name']
      this.diagnosis = obj['diagnosis']
    }

    static findByAll(callback) {
        db.all(`SELECT * FROM patients;`,(err,rows)=>{
            if(err) callback(err, null)
            else {
                let result = []
                for(let i = 0; i < rows.length; i++){
                    result.push(new Patient(rows[i]))
                }
                callback(null, result)
            }
        })
    }

    static findById(id, callback) { 
        db.all(`SELECT * FROM patients
                WHERE id = ${id};`, (err, rows)=> {
                    if(err) callback(err, null)
                    else {
                        let result = []
                        result.push(new Patient(rows[0]))
                        callback(null, result)
                    }
                })
    }
    
    static CountPatient (callback) {
        db.all(`SELECT COUNT(*) AS total FROM patients;`, (err,rows)=> {
            if(err) callback(err, null)
            else callback(null, rows)
        })
    }

    static insertPatient(name, diagnosis, callback) {
        db.run(`INSERT INTO patients VALUES(null, "${name}", "${diagnosis}")` , (err)=> {
            if(err) callback(err)
            else callback(null)
        })
    }
  }
  
  module.exports = Patient