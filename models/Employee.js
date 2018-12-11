const db = require('../db')
const bcrypt = require('bcryptjs')

class Employee {
    constructor(obj) {
        this.id = obj.id
        this.username = obj.username
        this.password = obj.password
        this.role = obj.role
        this.status = obj.status || 0
    }

    static findAll(cb) {
        let query = `
        SELECT *
        FROM Employees`
        db.all(query, (err, data) => {
            err ? cb({msg: 'err findAll', err: err}): cb(null, data)
        })
    }

    static findOne(obj, cb) {
        let column = Object.keys(obj)
        let find = Object.values(obj)
        let query = `
        SELECT *
        FROM Employees
        WHERE ${column[0]} = ?`
        db.get(query, find, (err, data) => {
            if (err) {
                cb({msg: 'err findOne', err: err})
            } else {
                data ? cb(null, new Employee(data)): cb(null, null)
            }
        })
    }

    create(cb) {
        Employee.findOne('username', [this.username], (err, data) => {
            if (err) {
                cb(err)
            } else {
                if (data) {
                    cb({msg: 'username sudah terpakai'})
                } else {
                    bcrypt.genSalt(10, (err, salt) => {
                        if (err) {
                            cb({msg: 'err genSalt', err: err})
                        } else {
                            bcrypt.hash(this.password, salt, (err, hash) => {
                                if (err) {
                                    cb({msg: 'err hash', err: err})
                                } else {
                                    this.password = hash
                                    let queryCrete = `
                                    INSERT INTO Employees (username, password, role, status)
                                    VALUES (?, ?, ?, ?)`
                                    let input = Object.values(this).filter(e => e !== undefined)
                                    db.run(queryCrete, input, function(err) {
                                        err? cb({msg: 'err insert data', err: err}): cb(null, this)
                                    })
                                }
                            })
                        }
                    })
                }
            }
        })
    }

    update(obj, cb) {
        let column = Object.keys(obj)
        let input = Object.values(obj)
        let queryUpdate = `
        UPDATE Employees
        SET ${column[0]} = ?
        WHERE id = ${this.id}`
        db.run(queryUpdate, input, function(err) {
            if (err) {
                cb({msg: 'err update data', err: err})
            } else {
                cb(null, this)
            }
        })
    }


}

module.exports = Employee