var db = require('../database/connection.js');

class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
  }

  static findAll(callback) {
    let query = `SELECT * FROM Employees;`;
    db.all(query, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    })
  }

  static registerNewEmployee(name, username, password, position, callback) {
    let newEmployee = new Employee(name, position, username, password);
    this.create(newEmployee, (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    })
  }

  static findOne(username, password, callback) {
    let query = `SELECT * FROM Employees
                 WHERE username = "${username}" AND password = "${password}";`;
    db.get(query, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    })
  }

  static findOneByLoginPos(position, callback) {
    let query = `SELECT * FROM Employees
                 WHERE isLogin = "1" AND position = "${position}";`;
    db.get(query, (err, data) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    })

  }
  
  static count() {
    let query = `SELECT COUNT(*) FROM Employees;`;
    db.get(query, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null,data);
      }
    })
  }

  static create(data, callback) {
    //already an object class
    let query = `INSERT INTO Employees (name, position, username, password)
                 VALUES ("${data.name}", "${data.position}", "${data.username}", "${data.password}");`
    db.run(query, (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    })
  }

  static findById(id, callback) {
    let query = `SELECT * FROM Employees
                  WHERE id = ${id}`;
    db.get(query, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    })
  }

  static update(colName, value, id, callback) {
    let query = `UPDATE Employees
                 SET ${colName} = ${value}
                 WHERE id = ${id}`;
    db.get(query, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    })
  }

  static delete (id, callback) {
    let query = `DELETE FROM Employees
                 WHERE id = ${id}`;
    db.run(query, (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    })
  }

}



module.exports = Employee;