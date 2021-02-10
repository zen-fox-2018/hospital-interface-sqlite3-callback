const db = require('../db')

class Employee {
    constructor(id, username, password, role, login) {
        this._id = id
        this._username = username;
        this._password = password;
        this._role = role;
        this._login = login || 0;
    }

    get password() {
        return this._password
    }

    get role() {
        return this._role
    }
    get login() {
        return this._login
    }

    get id() {
        return this._id
    }

    static create (input, callback) {
        let query = `INSERT INTO Employees (username, password, role)
                    VALUES (?, ?, ?)`
        let value = Object.values(input)
        console.log(value)
        db.run(query,value, function(err) {
            if (err) {
                callback(err)
            } else {
                // console.log(this)
                callback(null, this)
            }
        })
    }

    static findAll (callback) {
        let query = `SELECT * FROM Employees `
        db.all(query, function (err, rows) {
            if (err) {
                callback(err)
            } else {
                let data = []
                rows.forEach(person => {
                    let employee = new Employee(person.id, person.username, person.password, person.role, person.login)
                    data.push(employee)
                });
                callback(null, data)
            }
         })
    }

    static findWhere (object, callback) {
        let query = `SELECT * FROM Employees WHERE ${object.field} = ?`
        let input = [object.value]
        db.get(query,input, function(err, row) {
            if (err) {
                callback(err)
            } else {
                if (row) {
                    let employee = new Employee(row.id, row.username, row.password, row.role, row.login)
                    callback(null, employee)
                } else {
                    callback(null, {})
                }
            } 
        })
    }

    static delete (input, callback) {
        let query = `DELETE FROM Employees
                    WHERE ${input.field} = ?`
        db.run(query,[input.value],  function(err) {
            if (err) {
                callback(err)
            } else {
                callback(null,this)
            }
        })
    }

    static CountEmployee(callback) {
       let query = `SELECT COUNT(*) AS totalEmployee FROM Employees`
       db.all(query, function (err, rows) {
           if (err) {
               callback(err)
           } else {
               callback(null, rows )
           }
       })
    }

    update(data, callback) {
        let query = `UPDATE Employees
                    SET ${data.field} = ?
                    WHERE id = ? `
        let input = [data.value, this.id]
        db.run(query,input, function(err) {
            if (err) {
                callback(err)
            } else {
                callback(null,this)
            }
        })
    }


}

module.exports = Employee