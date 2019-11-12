const View = require('../views/View')
const Employee = require('../models/Employee') 
const Patient = require('../models/Patient') 

class Controller {
  static execute(input) {
    let command = input[0]
    let option = input.slice(1)

    switch (command) {
      case 'register': Controller.register(option)
        break; 
      case 'login': Controller.login(option)
        break;
      case 'addPatient': Controller.addPatient(option)
        break;
      case 'logout': Controller.logout(option)
        break;
      case 'delete': Controller.delete(option)
        break;
      default: Controller.help()
        break;
    }
  }

  static register(input) {
    const newEmp = new Employee(null, input[0], input[2], input[1])
    newEmp.insert((err)=> {
      if(err) {
        View.error(`Error inserting data`, err)
      } else {
        Employee.findOne('username', input[0], (err, data) => {
          if(err) {
            View.error(`find one data `, err)
          } else {
            Employee.findAll((err, total) => {
              if(err) {
                View.error(`finding total employee`, err)
              } else {
                View.display(`save data \n` , data)
                View.display(`Total employee: ${total.length}`)
              }
            })
          }
        })
      }
    })
  }

  static login(input) {
    let obj = {
      set: 'login',
      where: 'id',
      val1: 1 
    }

    Employee.findOne('login', 1, (err, dataLogin) => {
      if(err) {
        View.error(err)
      } else {
        if(dataLogin !== null) {
          View.error(`Somebody login already`)
        } else {
          Employee.findOne('username', input[0] , (err, data1) => {
            if(err) {
              View.error(`finding username`, err)
            } else {
              if(data1.password !== input[1]) {
                View.error(`Password wrong!`)
              } else {
                data1.update(obj, (err) => {
                  if(err) {
                    View.error(`updating data`, err)
                  } else {
                    View.display(`user logged in successfully :` , data1.username)
                  }
                })
              }
            }
          })
        }
      }
    })

  }

  static logout(input) {
    let obj = {
      set: 'login',
      where: 'username',
      val1: 0 
    }

    Employee.findOne('username', input[0] , (err, data) => {
      if(err) {
        View.error(err)
      } else {
        if (data) {
          if(data.login == 0) {
            View.error(`\nUser didn't login`)
          } else {
            data.update(obj, (err) => {
              if(err) {
                View.error(`updating data`, err)
              } else {
                View.display(`\nuser logged out successfully :` , data.username)
              }
            })
          }
        } else {
          View.error(`Username not found`)
        }
      }
    })
  }

  static addPatient(input) {
    let diag = input.slice(1)
    const newPat = new Patient(null ,input[0], diag.join(',') )

    Employee.findOne('login', 1, (errFO, dataLogin) => {
      if(errFO) {
        View.error(`Login first!`)
      } else {
        if(dataLogin.position !== 'dokter') {
          View.error(`Only doctor have the authority to Add patient!`)
        } else {
          newPat.insert((err1) => {
            if(err1) {
              View.error(`inserting patient data`, err1)
            } else {
              Patient.findOne('name', input[0] , (err2, data) => {
                if(err2) {
                  View.error(`finding added patient`, err2)
                } else {
                  Patient.findAll((err,total ) => {
                    if(err) {
                      View.error(`displaying total data` , err)
                    } else {
                      View.display(`Success adding ${data.name}. \nTotal patient: ${total.length}`)
                    }
                  })
                }
              })
            }
          })
        }
      }
    })
  }
  
  static delete(input) {

     Employee.findOne('login', 1, (errFO, dataLogin) => {
      if(errFO) {
        View.error(`Login first!`)
      } else {
        if(dataLogin.position !== 'dokter') {
          View.error(`Only doctor have the authority to delete patient!`)
        } else {
          Patient.findOne('id', input[0], (err, dataPat) => {
            if(err) {
              View.error(err)
            } else {
              dataPat.delete((err) => {
                if(err) {
                  View.error(err)
                } else {
                  View.display(`delete data : ${dataPat.id} `)
                }
              })
            }
          })
        }
      }
    })
  }

  static help() {
    View.help()
  }
}

module.exports = Controller