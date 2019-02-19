const Employee = require('../models/employee');
const EmployeeView = require('../views/employee');
const Patient = require('../models/patient');

class ControllerEmployee {

  static createEmployee(data) {
    Employee.createEmployee(data, (errCreate) => {
      if (errCreate) {
        if (errCreate.errno === 19) {
          EmployeeView.showErr(`Username already exists!`);
        } else {
          EmployeeView.showErr(errCreate);
        }
      } else {
        Employee.listAllEmployees((errList, employees) => {
          if (errList) {
            EmployeeView.showErr(errList);
          } else {
            let input = {
              name : data[0],
              username : data[1],
              password : data[2],
              position : data[3]
            }
            EmployeeView.showSuccess(`Successfully insert data ${JSON.stringify(input)}. Total data : ${employees.length};` );
          }
        })
      }
    })
  }

  static listAllEmployees() {
    Employee.listAllEmployees((err, employees) => {
      if (err) {
        EmployeeView.showErr(err);
      } else {
        EmployeeView.showData(employees);
      }
    })
  }

  static findEmployees(data) {
    Employee.findOne(data, (err, employees) => {
      if (err) {
        EmployeeView.showErr(err);
      } else {
        EmployeeView.showData(employees)
      }
    })
  }

  static loginEmployees(activity, data) {
    Employee.findOne(['username', data[0]], (errFind, employee) => {
      if (errFind) {
        EmployeeView.showErr(errFind)
      } else {
        if (employee) {
          if (employee.password === data[1]) {
            Employee.findOne(['isLogin', 1], (errLogin, userLogin) => {
              if (errLogin) {
                EmployeeView.showErr(errLogin);
              } else {
                if (userLogin) {
                  if (activity === 'login') {
                    EmployeeView.showErr(`There are another user logged in`);
                  } else {
                    if (employee.name === userLogin.name) {
                      employee.updateEmployee(['isLogin', 0], (errUpdate) => {
                        if (errUpdate) {
                          EmployeeView.showErr(errUpdate);
                        } else {
                          EmployeeView.showSuccess(`Good Bye ${employee.name}.`)
                        }
                      })
                    } else {
                      EmployeeView.showErr(`There are another user logged in`);
                    }
                  }
                } else {
                  if (activity === 'login') {
                    employee.updateEmployee(['isLogin', 1], (errUpdate) => {
                      if (errUpdate) {
                        EmployeeView.showErr(errUpdate);
                      } else {
                        EmployeeView.showSuccess(`Welcome ${employee.name}.`)
                      }
                    })
                  } else {
                    EmployeeView.showErr(`You are not logged in`);
                  }
                }
              }
            })
          } else {
            EmployeeView.showErr(`Wrong password!!`);
          }
        } else {
          EmployeeView.showErr(`Wrong Username!!!`);
        }
      }
    })
  }

  static addPatient(data) {
    Employee.findOne(['isLogin', 1], (errFind, employee) => {
      if (errFind) {
        EmployeeView.showErr(errFind);
      } else {
        if (employee) {
          if (employee.position === 'doctor') {
            Patient.createPatient(data, (errDoctor) => {
              if (errDoctor) {
                EmployeeView.showErr(errDoctor)
              } else {
                Patient.listAllPatients((errList, patients) => {
                  if (errList) {
                    EmployeeView.showErr(errList);
                  } else {
                    EmployeeView.showSuccess(`Successfully insert patient. Total data : ${patients.length}.`)
                  }
                })
              }
            })
          } else {
            EmployeeView.showErr(`Do not have permission to insert patient.`);
          }
        } else {
          EmployeeView.showErr(`Must login as doctor`)
        }
      }
    })
  }
}

module.exports = ControllerEmployee;
