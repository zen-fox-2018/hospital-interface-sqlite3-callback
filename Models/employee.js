
const db = require("../db");

class Employees {
    constructor(id, name, position, username, password) {
        this.id = id
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
                callback(err, null);
            } else {

                if(row === undefined) {
                    callback(null);
                } else {
                    let newRow = new Employees(row.id, row.name, row.position, row.username, row.password, row.isLogin);

                    callback(null, newRow);
                }
            }
        })
    }

    static findAll(callback) {
        let selectAll = `SELECT * FROM Employees`
        db.all(selectAll, function(err, data) {
            if(err){
                callback(err, null);
            } else {
                let result = []
                for(let i = 0; i < data.length; i++) {
                    let newData = new Employees(data[i].id, data[i].name, data[i].position, data[i].username, data[i].password, data[i].isLogin);
                    result.push(newData)
                }
                callback(null, result);
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

    static update(column, value, id, callback) {
        let query = `UPDATE Employees
                     SET ${column} = ${value}
                     WHERE 
                        id = ${id}`
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