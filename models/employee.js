const db = require('../db/connection');

class Employee {
  constructor(obj) {
    this.id = obj. id;
    this.name = obj.name;
    this.username = obj.username;
    this.password = obj.password;
    this.position = obj.position;
    this.isLogin = obj.isLogin;
  }

  static listAllEmployees(callback) {
    const query = `
      SELECT
        *
      FROM
        employees;
    `;

    db.all(query, (err, employees) => {
      if (err) {
        callback(err, null);
      } else {
        let dataEmployees = [];
        employees.forEach(e => {
          dataEmployees.push(new Employee(e));
        })
        callback(null, dataEmployees);
      }
    })
  }

  static createEmployee(data, callback) {
    const query = `
      INSERT INTO
        employees (name, username, password, position, isLogin)
      VALUES
        (?, ?, ?, ?, 0);
    `;

    db.run(query, data, (errRun) => {
      if (errRun) {
        callback(errRun);
      } else {
        callback(null)
      }
    })
  }

  static findOne(search, callback) {

    const query = `
      SELECT
        *
      FROM
        employees
      WHERE ${search[0]} = ?`

    db.get(query, search.slice(1), (err, employee) => {
      if (err) {
        callback(err, null);
      } else {
        if (employee) {
          callback(null, new Employee(employee));
        } else {
          callback(null, null);
        }
      }
    })
  }

  updateEmployee(setValue, callback) {
    const query = `
      UPDATE
        employees
      SET
        ${setValue[0]} = ?
      WHERE
        id = ${this.id};
    `
    db.run(query, setValue[1], (err) => {
      if (err) {
        callback(this.id)
      } else {
        callback();
      }
    })
  }
}

module.exports = Employee;
