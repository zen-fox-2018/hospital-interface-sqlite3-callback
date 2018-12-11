const fs = require('fs');
const db = require('../dbConnect.js');
const Controller = require('../controller.js');

class Employee {
    constructor(name, position, username, password) {
        this.name = name
        this.position = position;
        this.username = username;
        this.password = password;
        this.isLogin = 0;
    }

    static findAll(callback) {

        let qSearch =
            `SELECT
              *
             FROM
              Employees`;


        db.all(qSearch, (err, employees) => {
            if (err) {
                callback(err, null);
            } else {

                let data = [];
                for (let i = 0; i < employees.length; i++) {
                    data.push(new Employee(employees[i].name, employees[i].position, employees[i].username, employees[i].password));
                }
                callback(null, data);
            }
        });

    }

    static insertData(name, position, username, password, callback) {

        let qInsert =
            `INSERT INTO
             Employees (name, position, username, password, isLogin)
             VALUES ("${name}", "${position}", "${username}", "${password}", 0)`;

        db.run(qInsert, (err) => {
            if (err) {
                callback(err)
            } else {
                callback();
            }
        });

    }

    static findOne(field, value, callback) {

        if (isNaN(+value)) {
            var qSearchOne =
                `SELECT
                  *
                 FROM Employees
                 WHERE ${field} = "${value}";`;
        } else {
            var qSearchOne =
                `SELECT
                  *
                 FROM Employees
                 WHERE ${field} = ${+value};`;
        }


        db.get(qSearchOne, (err, rows) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, rows);
            }
        });
    }

    static updateLogin(username, callback) {

        let qUpdateLogin =
            `UPDATE Employees
             SET isLogin = 1
             WHERE Employees.username = "${username}";
        `;

        db.run(qUpdateLogin, (err) => {
            if (err) {
                callback(err);
            } else {
                callback();
            }
        });
    }
}

module.exports = Employee;