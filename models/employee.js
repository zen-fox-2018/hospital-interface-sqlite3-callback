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
        ("${data[0]}", "${data[1]}", "${data[2]}", "${data[3]}", 0);
    `;

    Employee.findAnEmployee(['username', data[1]], (errFind, employees) => {
      if (errFind) {
        callback(errFind)
      } else {
        if (employees.length) {
          callback(`username ${data[1]} already exist!!`)
        } else {
          db.run(query, (errRun) => {
            if (errRun) {
              callback(errRun);
            } else {
              callback(null)
            }
          })
        }
      }
    })
  }

  static findEmployees(search, callback) {
    let whereValues = '';
    for (let i = 0; i < search.length - 1; i+=2) {
      whereValues += `${search[i]} like "%${search[i+1]}%"`;
      if (i < search.length - 2) {
        whereValues += ' AND ';
      }
    }

    const query = `
      SELECT
        *
      FROM
        employees
      WHERE ${whereValues}`

    db.all(query, (err, employees) => {
      if (err) {
        callback(err, null);
      } else {
        let dataEmployees = [];
        employees.forEach( e => {
          dataEmployees.push(new Employee(e));
        })
        callback(null, dataEmployees);
      }
    })
  }

  static findAnEmployee(search, callback) {
    let whereValues = '';
    for (let i = 0; i < search.length - 1; i+=2) {
      whereValues += `${search[i]} = "${search[i+1]}"`;
      if (i < search.length - 2) {
        whereValues += ' AND ';
      }
    }

    const query = `
      SELECT
        *
      FROM
        employees
      WHERE ${whereValues}`

    db.all(query, (err, employees) => {
      if (err) {
        callback(err, null);
      } else {
        let dataEmployees = [];
        employees.forEach( e => {
          dataEmployees.push(new Employee(e));
        })
        callback(null, dataEmployees);
      }
    })
  }

  static updateEmployee(data, callback) {
    let idEmployee = data[0];
    data = data.slice(1);
    let setValues = '';
    for (let i = 0; i < data.length - 1; i+=2) {
      setValues += `${data[i]} = "${data[i+1]}"`;
      if (i < data.length - 2) {
        setValues += ', ';
      }
    }

    const query = `
      UPDATE
        employees
      SET
      ${setValues}
      WHERE id = ${idEmployee}`

    Employee.findAnEmployee(['id', idEmployee], (errFind, employees) => {
      if (errFind) {
        callback(errFind)
      } else {
        if (employees.length) {
          db.run(query, (err) => {
            if (err) {
              callback(err);
            } else {
              callback (null);
            }
          })
        } else {
          callback(`ID Not Found.`)
        }
      }
    })
  }

  static addPatient (callback) {
    let data = ['isLogin', 1];
    Employee.findAnEmployee(data, (err, employee) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, employee);
      }
    })
  }

}

module.exports = Employee;
