const db = require(`../db`)
const bcrypt = require(`bcryptjs`)

class Employee {
    constructor(input) {
        this.username = input.username
        this.password = input.password
        this.role = input.role
    }

    create(username, password, role, cb) {
        bcrypt.hash(password, 10, function (err, hash) {
            let insertQuery = `INSERT INTO Employees (
                username, password, role, isLogin
            ) VALUES (
                "${username}", "${hash}", "${role}", "false"
            )`

            db.run(insertQuery, function (err) {
                err ?
                    cb(err, null) :
                    cb(null, {
                        username: username,
                        password: password,
                        role: role
                    })
            })
        });
    }

    static readAll(cb) {
        let readQuery = `SELECT * FROM Employees`
        db.all(readQuery, function (err, rows) {
            err ?
                cb(err, null) :
                cb(null, rows)
        })
    }

    static readOne(column, status, cb) {
        let readOnequery = `SELECT * FROM Employees WHERE ${column} = "${status}"`
        db.get(readOnequery, function (err, row) {
            err ?
                cb(err, null) :
                cb(null, row)
        })
    }

    update(whereCase, whereStatus, column, colStatus, cb) {
        let updateQuery = `UPDATE Employees SET ${column} = "${colStatus}" WHERE ${whereCase} = "${whereStatus}"`
        db.run(updateQuery, function (err) {
            err ?
                cb(err, null) :
                cb(null, this)
        })
    }

}

module.exports = Employee 