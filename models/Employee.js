const db = require('../database/connector')

class Employee {
    constructor(obj) {
      this.id = obj['id']
      this.name = obj['name']
      this.posisition = obj['posisition']
      this.username = obj['username']
      this.password = obj['password']
      this.isLogin = obj['isLogin']
    }

    static findByAll(callback) {
        db.all(`SELECT * FROM employees;`,(err,rows)=>{
            if(err) callback(err, null)
            else {
                let result = []
                for(let i = 0; i < rows.length; i++){
                    result.push(new Employee(rows[i]))
                }
                callback(null, result)
            }
        })
    }

    static CountEmployee (callback) {
        db.get(`SELECT COUNT(*) AS total FROM employees;`, (err,rows)=> {
            if(err) callback(err, null)
            else callback(null, rows)
        })
    }

    static findOne(fieldName, value, callback) {
    
        db.get(`SELECT * FROM employees
                WHERE ${fieldName} = ?` , value , (err,data)=> {
                    if(err) callback(err, null)
                    else {
                        callback(null, data)
                    }
                })
    }

    static findById(id, callback){
        db.get(`SELECT * FROM employees
                WHERE id = ${id};`, (err,rows)=> {
                    if(err) callback(err,null)
                    else {
                        let result = []
                        result.push(new Employee(rows[0]))
                        callback(null,result)
                    }
                })
    }

    static insertDataEmployee(name, username, password, role, callback){
        db.run(`INSERT INTO employees VALUES (null , "${name}", "${role}", "${username}", "${password}", 0);`, (err)=>{
            if(err) callback(err)
            else callback(null)
        })
    }

    static updateData(id, value, fieldName, callback) {
        db.run(`UPDATE employees
                SET ${fieldName} = ?
                where id =  ${id}`, value, (err) =>{
                    if(err) callback(err)
                    else callback(null)   
                })
    }
    
  }

  module.exports = Employee