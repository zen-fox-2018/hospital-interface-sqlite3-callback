const db = require(`../db`)
const bcrypt = require(`bcryptjs`)

class Employee {
    constructor(input) {
        this.id = input ? input.id : null
        this.username = input ? input.username : null
        this.password = input ? input.password : null
        this.role = input ? input.role : null
        this.isLogin = input ? input.isLogin : null
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
            let self;
            if (row != undefined) {
                self = new Employee({
                    id: row.id,
                    username: row.username,
                    password: row.password,
                    role: row.role,
                    isLogin: row.isLogin
                })
            } else {
                self = new Employee()
            }
            err ?
                cb(err, null) :
                cb(null, self)
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