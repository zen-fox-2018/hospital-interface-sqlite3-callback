const db = require ('../Database/db.js')


class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }

  static create (name, diagnosis, callback) {   
    let query = `
        INSERT INTO Patients (name, diagnosis)
        VALUES
        ("${name}", "${diagnosis} " )
    `
    db.run(query, function(err){
        if(err) {
            callback(err, null)
        }else{
            let obj = new Patient (null, name, diagnosis)
            // console.log(obj)
            callback(null, obj)
        }
    })
  }

  static count (callback) {
    let query = `
                SELECT COUNT (Patients.name) AS count
                FROM Patients;
    `
    db.all(query ,function (err, data) {
        if(err) {
            callback(err, null)
        }else{
            let count = data[0]['count']
            callback(null, count)
        }
    })
}
}

module.exports = Patient;

