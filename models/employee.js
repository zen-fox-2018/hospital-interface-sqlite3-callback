const db = require("../database/connections.js")

class Employee {
    constructor(name, username, password, role, status) {
        this.name = name
        this.username = username
        this.password = password
        this.role = role
        this.status = status
    }

    static findAll(cb) {
        let query = `SELECT * FROM Employees`

        db.all(query, function (err, data) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, data)
            }
        })
    }

    static createNew(name, username, password, role, status, cb) {

        let input = new Employee(name, username, password, role, status)
        let query =
            `INSERT INTO Employees (name, username, password, role, status)
            VALUES ("${input.name}", "${input.username}", "${input.password}", "${input.role}",${input.status})`

        db.run(query, function (err) {
            if (err) {
                cb(err);
            }
            else {
                cb(null)
            }
        })

    }

    static findOne(field, value, cb) {
        // console.log(field,'ini field')
        // console.log(value,'ini value')
        let query =
            `SELECT * FROM Employees
             WHERE ${field} = "${value}"`

        db.all(query, function (err, data) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, data)
            }
        })
    }


    static findById() {

    }

    static update(field, value, id, cb) {

        let query = 
            `UPDATE Employees
             SET ${field} = "${value}"
             WHERE id = ${id}`

        db.run(query, function(err){
            if (err) {
                cb(err)
            } else {
                cb(null)
                // console.log('berhasil update')
            }
        })

    }

    static delete() {

    }
}
module.exports = Employee