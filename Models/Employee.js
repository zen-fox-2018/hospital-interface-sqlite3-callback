const db = require('./Connect to Database');
class Employee {
  constructor(name, position, username, password, status) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
    this.status = status
  }

  static register(name, position, username, password, callback) {
    Employee.createEmployeeList(name, position, username, password, function(err) {
      if (err) {
        callback(err)
      } else {
        Employee.findAllEmployee(function(err, employeeList) {
          if (err) {
            callback(err, null)
          } else {
            callback(null, employeeList)
          }
        })  
      }
    })
  }

  static logInEmployee(username, password, callback) {
    Employee.findAllEmployee(function(err, employeeList) {
      if (err) {
        callback(err, null);
      } else {
        let isAllOff = true;
        for (let i = 0; i <= employeeList.length - 1; i++) {
            if (employeeList[i].status === 'on') {
                isAllOff = false;
            }
        }
        if (isAllOff === true) {
          let isCorrect = false;
          for (let i = 0; i <= employeeList.length-1; i++) {
            if (employeeList[i].username == username && employeeList[i].password == password) {
              isCorrect = true;
              var name = employeeList[i].name
              employeeList[i].status = 'on'
            } 
          }
          if (isCorrect === true) {
              Employee.updateEmployeeList(name, function(err) {
                if (err) {
                  callback(err, null)
                } else {
                  callback(null, name)
                } 
              })
          } else {
              callback(null, false)
          }
        } else {
          callback(null, undefined)
        }
      }
    })
  }


  static createEmployeeList(name, position, username, password, callback) {
    let query = `
      INSERT INTO Employees 
      (name, position, username, password)
      VALUES
      ("${name}", "${position}", "${username}", "${password}")
      `
    db.run(query, function(err) {
      if (err) {
        callback(err)
      } else {
        callback()
      }
    })
  }

  static updateEmployeeList(target, callback) {
    let query = `
    UPDATE Employees
    SET status = "on"
    WHERE name = "${target}";`
    db.run(query, function(err) {
      if (err) {
        callback(err);
      } else {
        callback();
      }
    })
  }

  static deleteEmployeeList(condition, callback) {
    let query = `
      DELETE FROM Employees
      WHERE ${condition}`

    db.run(query, function(err) {
      if (err) {
        callback(err);
      } else {
        callback()
      }
    })
  }
  
  static findAllEmployee(callback) {
    let query =  `SELECT * FROM Employees`;
    db.all(query, function(err, dataEmployee) {
      if (err) {
        callback(err, null);
      } else {
        let theList = []
        for (let i = 0;  i <= dataEmployee.length-1; i++) {
          if (dataEmployee[i].status === null) {
            dataEmployee[i].status = 'off'
          }
          let list = new Employee(dataEmployee[i].name, dataEmployee[i].position, dataEmployee[i].username, dataEmployee[i].password, dataEmployee[i].status);
          theList.push(list);
        }
        callback(null, theList);
      }
    })
  }

  static findByIdEmployee(targetId, callback) {
    let query = `SELECT Employees.name FROM Employees
      WHERE Employees.id = ${targetId}`

    db.all(query, function(err, dataEmployee) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, dataEmployee)
      }
    })
  }

}
module.exports = Employee;
