const db = require('../db.js')

class Employee {
    constructor(name, username, password, position) {
        this.name = name,
        this.username = username,
        this.password = password,
        this.position = position,
        this.isLogin = 'false'
    }
    
    static findAll(cb) {
        let query = `SELECT * FROM Employees`
            db.all(query, function(err, data) {
                if(err) {
                    cb(err)
                } else {
                    let newData = []
                    for(let i = 0; i < data.length; i++) {
                        let person = new Employee(data[i].name, data[i].username, data[i].password, data[i].position)
                        newData.push(person)
                    }
                    cb(null, data)
                }
            })
    }

    static findOne(options, cb) {
        let query = `SELECT * FROM Employees WHERE ${options.field}  = "${options.value}"`
        db.get(query, function(err, row) {
            if(err) {
                cb(err, null)
            } else {
                if(!row) {
                    cb(null, null)
                } else {
                    let employee = new Employee(row.name, row.username, row.password, row.position)
                    cb(null, employee)
                }
            }
        })
    }

    static update(input, cb) {
        let query = `UPDATE Employees SET ${input.field} = "${input.value}" WHERE username = "${input.username}"`
        db.run(query, function(err) {
            if(err) {
                cb(err)
            } else {
                cb(null)
            }
        })
    }

    static create(input, cb) {
        let newEmployee = new Employee(input.name, input.username, input.password, input.position)
        let query = `INSERT INTO Employees (name, username, password, position, isLogin)
        VALUES('${newEmployee.name}', '${newEmployee.username}', '${newEmployee.password}', '${newEmployee.position}', '${newEmployee.isLogin}')`
        
        db.run(query, function(err) {
            if(err) {
                cb(err)
            } else {
                cb(null)
            }
        })
    }

    static delete(input, cb) {
        let query = `DELETE FROM Employee Where id = ${input}`

        db.run(query, function(err) {
            if(err) {
                cb(err)
            } else {
                cb(null)
            }
        })
    }
}

module.exports = Employee