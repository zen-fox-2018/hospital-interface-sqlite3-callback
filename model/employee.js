const db = require('../database/connection.js')


class Employee {
    constructor(name, position, username, password) {
      this.name = name
      this.position = position
      this.username = username
      this.password = password
    }

    static findAll(cb){
        let select = `SELECT * FROM Employees`
        db.all(select, function(err, data){
            if(err){
                cb(err, null)
            }   else{
                cb(null,data)
            }
        })
    }

    static findWhere(condition, cb){
        let query = 
        `SELECT * 
        FROM Employees
        WHERE ${condition}`

        db.all(select, function(err, data){
            if(err){
                cb(err, null)
            }   else{
                cb(null,data)
            }
        })
    }

    static findById(id, cb){
        let query = 
        `SELECT * FROM employees WHERE id = ${id}`

        db.all(select, function(err, data){
            if(err){
                cb(err, null)
            }   else{
                cb(null,data)
            }
        })
    }

    static update(column, value, id, cb){
        let query = 
        `UPDATE Employees
        SET '${column}' = ${value}
        WHERE id = ${id}`

        db.run(query, function (err){
            if(err){
                cb(err)
            }   else{
                cb(null)
            }
        })
        
    }

    static insert(employee, cb){
        let query = 
        `INSERT INTO Employees 
        VALUES (null, '${employee.name}', '${employee.position}', '${employee.username}', '${employee.password}')`

        db.run(query, function (err){
            if(err){
                cb(err)
            }   else{
                cb(null)
            }
        })
    }
}

// Employee.findAll(function(err, data){
//     if(err){
//         console.log(err);
//     }   else{
//         console.log(data);
//     }
// })

module.exports = Employee
  