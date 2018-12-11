const View = require('../view/view.js');
const Employee = require('../model/employee.js');
const Patient = require('../model/patient.js');

class Controller {

  static allData() {
    Employee.findAll((err, data) => {
      if (err) {
        View.displayError(err);
      } else {
        View.displayData(data);
      }
    });
  }

  static registration(name, username, password, position) {
    Employee.registerNewEmployee(name, username, password, position, (err) => {
      if (err) {
        View.displayError(err);
      } else {
        Employee.findAll((errFindAll, data) => {
          if (err) {
            View.displayError(errFindAll);
          } else {
            View.regSucceed(data);
          }
        })
      }
    });
  }

  static login(username, password) {
    Employee.findOne(username, password, (err, employee) => {
      if (err) {
        View.displayError(err);
      } else {
        if (!employee) {
          View.displayLoginStatus(`Wrong username or password`);
        } else {
          if (employee.isLogin === '1') {
            View.displayLoginStatus(`Someone still haven't logged out`);
          } else {
            Employee.update('isLogin', true, employee.id, (errUpdate) => {
              if (errUpdate) {
                View.displayError(errUpdate);
              } else {
                View.displayLoginStatus(`username ${username} has logged in successfully`);
              }
            })
          }
        }
      }
    })
  }

  static addPatient(name, diagnosis) {
    Employee.findOneByLoginPos("dokter", (err, dataEe) => {
      if (err) {
        View.displayError(err);
      } else {
        if(!dataEe) {
          View.displayAddPatientStatus(`tidak memiliki akses untuk patient`);
        } else {
          let newPatient = new Patient(name, diagnosis);
          Patient.insert(newPatient, (errInsert) => {
            if (errInsert) {
              View.displayError(errInsert);
            } else {
              Patient.count((errCount, data) => {
                if (errCount) {
                  View.displayError(errCount);
                } else {
                  View.displayAddPatientStatus(`data berhasil ditambahkan. Total Data Pasien: ${data.count}`)
                }
              });
            }
          })
        }
      }
    })
    // Patient.findOne()
  }

}

module.exports = Controller;