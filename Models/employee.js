
const db = require("../db");

class Employees {
    constructor(name, position, username, password) {
        this.name = name;
        this.position = position;
        this.username = username;
        this.password = password;
        this.isLogin = 0;
    }

    static findOne(field, value, callback) {
        let selectOne = `SELECT * FROM Employees 
                         WHERE ${field} = "${value}"`
        db.get(selectOne, function(err, row) {
            if(err) {
                callback(err)
            } else {
                let newRow = new Employees(row.name, row.position, row.username, row.password, row.isLogin);

                callback(null, newRow);
            }
        })
    }

    static findAll(callback) {
        let selectAll = `SELECT * FROM Employees`
        db.all(selectAll, function(err, data) {
            if(err){
                callback(err, null)
            } else {
                let result = []
                for(let i = 0; i < data.length; i++) {
                    let newData = new Employees(data[i].name, data[i].position, data[i].username, data[i].password, data[i].isLogin);
                    result.push(newData)
                }
                callback(null, result)
            }
        })
    }

    static create(data, callback) {
        let insertNewEmployee = `INSERT INTO Employees(name, position, username, password, islogin)
                                 VALUES ("${data.name}", "${data.position}", "${data.username}","${data.password}", ${data.isLogin});`
        db.run(insertNewEmployee, function(err) {
            if(err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    }

    static update(input, callback) {
        let query = `UPDATE Employees
                     SET name = ${input.name},
                         position = ${input.position},
                         username = ${input.username},
                         password = ${input.password}
                     WHERE 
                        id = ${input.id};`
        db.run(query, function(err) {
            if(err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    }

    static delete(id, callback) {
        let deleteUser = `DELETE FROM Employees
                          WHERE id = ${id}`
        db.all(deleteUser, function(err, data) {
            if(err) {
                callback(err, null)
            } else {
                callback(null, data)
            }
        })
    }
}

module.exports = Employees