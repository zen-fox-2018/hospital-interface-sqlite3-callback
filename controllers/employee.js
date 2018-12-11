const Employee = require('../models/employee');
const EmployeeView = require('../views/employee');
const Patient = require('../models/patient');

class ControllerEmployee {

  static createEmployee(data) {
    Employee.createEmployee(data, (errCreate) => {
      if (errCreate) {
        EmployeeView.showErr(errCreate);
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
    Employee.findEmployees(data, (err, employees) => {
      if (err) {
        EmployeeView.showErr(err);
      } else {
        EmployeeView.showData(employees)
      }
    })
  }

  static loginEmployees(activity, data) {
    if (activity == 'login') {
      var isLogin = 1;
      var msg = 'Welcome';
    } else {
      var isLogin = 0;
      var msg = 'Bye';
    }

    let loginValue = ['username', data[0], 'password', data[1]];
    Employee.findAnEmployee(loginValue, (errFind, employees) => {
      if (errFind) {
        EmployeeView.showErr(errFind);
      } else {
        if (employees.length) {
          let editValue = [employees[0].id, 'isLogin', isLogin];
          Employee.updateEmployee(editValue, (errEdit) => {
            if (errEdit) {
              EmployeeView.showErr(errEdit);
            } else {
              EmployeeView.showSuccess(`${msg} ${employees[0].username}.`)
            }
          })
        } else {
          EmployeeView.showErr(`Wrong username or password!!!`)
        }
      }
    })
  }

  static addPatient(data) {
    Employee.addPatient((errLogin, employee) => {
      if (errLogin) {
        EmployeeView.showErr(errLogin);
      } else {
        if (employee.length) {
          Patient.createPatient(data, (errCreate) => {
            if (errCreate) {
              EmployeeView.showErr(errCreate);
            } else {
              Patient.listAllPatients((errList, patients) => {
                if (errList) {
                  EmployeeView.showErr(errList);
                } else {
                  EmployeeView.showSuccess(`Successfully insert patient's data. Total patients ${patients.length}.`)
                }
              })
            }
          })
        } else {
          EmployeeView.showErr(`Tidak memiliki akses untuk add patient!!`);
        }
      }
    })
  }
}

module.exports = ControllerEmployee;
