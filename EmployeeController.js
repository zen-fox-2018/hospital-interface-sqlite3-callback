const Employee = require('./Employee.js')
const Patient = require('./Patient.js')
const View = require('./View.js')

class EmployeeController {
  static register(options) {
    let lastId = 0
    let totalEmployee = 0
    let obj = {
      username: options[0],
      password: options[1],
      role: options[2]
    }
    let newEmployee = new Employee(obj)
    newEmployee.save(function(err, data) {
      if (err) {
        View.error(err)
      }
      else {
        lastId = data.lastID
        Employee.findAll(function(err, rows) {
          if (err) {
            View.error(err)
          }
          else {
            totalEmployee = rows.length
            View.registerSuccess(obj, totalEmployee)
          }
        })
      }
    })
  }

  static login(options) {
    let objCheck = {
      field: "isLogin",
      value: Number(1)
    }

    Employee.findOne(objCheck, function(err, row) {
      if (err) {
        View.error(err)
      }
      else {
        if (Object.keys(row).length !== 0) {
          View.loginFailed()
        }
        else {
          let obj = {
            field: "username",
            value: `"${options[0]}"`
          }
          Employee.findOne(obj, function(err, row) {
            if (err) {
              View.error(err)
            }
            else {
              if (Object.keys(row).length === 0) {
                View.wrongUsername()
              }
              else {
                let loginUser = row
                if (loginUser.password === options[1]) {
                  let loginObj = {
                    field: "isLogin",
                    value: 1
                  }
                  loginUser.update(loginObj, function(err, data) {
                    if (err) {
                      View.error(err)
                    }
                    else {
                      if (data.changes === 1) {
                        View.loginSucces(options[0])
                      }
                      else {
                        View.loginFailed()
                      }
                    }
                  })
                }
                else {
                  View.wrongPassword()
                }
              }
            }
          })
        }
      }
    })
  }

  static addPatient(options) {
    let objCheck = {
      field: "isLogin",
      value: 1
    }
    Employee.findOne(objCheck, function(err, row) {
      if (err) {
        View.error(err)
      }
      else {
        if (Object.keys(row).length === 0) {
          View.pleaseLogin()
        }
        else {
          if (row.role === "dokter") {
            let obj = {
              name: options[0],
              diagnosis: options.slice(1).join(",")
            }
            let newPatient = new Patient(obj)
            newPatient.save(function(err, data) {
              if (err) {
                View.error(err)
              }
              else {
                if (data.changes === 1) {
                  Patient.findAll(function(err, rows) {
                    if (err) {
                      View.error(err)
                    }
                    else {
                      View.addPatientSuccess(rows.length)
                    }
                  })
                }
                else {
                  View.error('Something went wrong while adding patient')
                }
              }
            })
          }
          else {
            View.pleaseLoginDoctor()
          }
        }
      }
    })
  }

  static logout(options) {
    let objCheck = {
      field: "isLogin",
      value: Number(1)
    }

    Employee.findOne(objCheck, function(err, row) {
      if (err) {
        View.error(err)
      }
      else {
        if (Object.keys(row).length === 0) {
          View.alreadyLogout()
        }
        else {
          let dataLogout = row
          let loginObj = {
            field: "isLogin",
            value: 0
          }
          dataLogout.update(loginObj, function(err, data) {
            if (err) {
              View.error(err)
            }
            else {
              if (data.changes === 1) {
                View.logoutSucces()
              }
              else {
                View.logoutFailed()
              }
            }
          })
        }
      }
    })
  }
}

module.exports = EmployeeController