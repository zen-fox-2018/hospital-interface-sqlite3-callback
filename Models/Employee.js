const db = require ('../Database/db.js')

class Employee {
    constructor(name, position, username, password, id) {
      this. id = id 
      this.name = name
      this.position = position
      this.username = username
      this.password = password
    }

    static findOne (field, value, callback) {
        let query =  `
                SELECT *
                FROM Employees
                WHERE "${value}" = Employees.${field}
        `
        db.get(query, function(err, data) { 
            if(err) {
                callback(err, null)
            }else {
                if(data !== undefined){
                    let obj = new Employee(data.name, data.position, data.username, data.password, data.id)
                    obj.id = data.id
                    callback(null,obj) 
                }else{
                    callback(null, data) 
                }
            }
        })
    }

    static findAll (callback) {
        let query = `
                    SELECT * 
                    FROM Employees;
        `
        db.all(query, function(err, data){
            if(err) {
                callback(err, null)
            }else {
                let employee = []
                for(let i = 0; i < data.length; i++){
                    let obj = new Employee (data[i].name, data[i].position, data[i].username, data[i].password, data.id)
                    employee.push(obj)
                }
                callback (null, employee)
            }
        })
    }


    static findbyID (id, callback) {
        let query = `
                SELECT * FROM Employees
                WHERE Employee.id = ${id}
        `
        db.all(query, function(err, data){
            if(err) {
                callback(err)
            }else {
                callback (null, data)
            }
        })
    }

    static create (name, position, username, password, callback) {
        
        let query = `
            INSERT INTO Employees (name, position, username, password, login)
            VALUES
            ("${name}", "${position}", "${username}", "${password}", "false" )
        `
        db.run(query, function(err){
            if(err) {
                callback(err, null)
            }else{
                let obj = new Employee (name, position, username, password, null)
                callback(null, obj)
            }
        })
    }

    static count (callback) {
        let query = `
                    SELECT COUNT (Employees.username) 
                    FROM Employees;
        `
        db.all(query ,function (err, data) {
            if(err) {
                callback(err, null)
            }else{
                let count = data[0]['COUNT (Employees.username)']
                callback(null, count)
            }
        })
    }

    static update (field, value, id, callback) {
        let update = `
                UPDATE Employees
                SET ${field} = "${value}"
                WHERE Employees.id = ${Number(id)};
                `
    db.run(update, function(err){
        if(err) {
            callback(err)
        }else{
            callback(null)
        }
    })
        
    }

    static delete () {
        
    }

  }




  

  module.exports = Employee