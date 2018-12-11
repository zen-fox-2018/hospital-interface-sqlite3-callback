const View = require('../views/View')
const Employee = require('../models/Employee.js')
const Patient = require('../models/Patient.js')

class Controller {
  static register(newData) {
    Employee.findOne(newData[0], (errOne, oneData) => {
      if (errOne) {
        View.showError('Error')
      } else {
        if (!oneData) {
          Employee.create(newData, (errCreate, createdData) => {
            if (errCreate) {
              View.menuFail('Register Gagal')
            } else {
              Employee.findAll( (err, employeeData) => {
                if (err) {
                  View.showError('Error')
                } else {
                  View.registSuccess(createdData, employeeData.length)                 
                }
              })
            }
          })
        } else {
          // Username already exist          
          View.menuFail('Username already exist') 
        }
      }
    })
  }
  
  static login(idpass) {
    Employee.findOne(["isLogged", 1], (err, isLogged) => { // check apakah sudah ada yg login apa belum
      if (err) {
        View.showError('Error')
      } else if (isLogged){
        View.menuFail(`komputer sedang digunakan oleh ${isLogged.username}`)
      } else {
        Employee.findOne(["username", idpass[0]], (err, userExist) => {
          if (err) {
            View.showError('Error')
          } else if (userExist === undefined) {
            View.menuFail('User / password is Wrong')
          } else {
            if (userExist.password !== idpass[1]) {
              View.menuFail('User / password is Wrong')
            } else {
              Employee.update(["id", userExist.id], ["isLogged", 1], (err) =>{
                if (err) {
                  View.showError('Update fail')
                } else {
                  View.loginSuccess(userExist.username)
                }
              })
            }
          }
        }) 
      }
    })
  }

  static logout() {
    Employee.findOne(["isLogged", 1], (err, isLogged) => {
      if (err) {
        View.showError('Error')
      } else if (!isLogged) {
        View.showError('Tidak ada yang sedang Login')
      } else {
        Employee.update(["id", isLogged.id], ["isLogged", 0], (err) =>{
          if (err) {
            View.showError('Error')
          } else {
            View.logoutSuccess(isLogged.username)
          }
        })
      }
    })
  }

  static addPatient(patient) {
    Employee.findOne(["isLogged", 1], (err, isLogged) => {
      if (err) {
        console.log(err) 
      } else if (!isLogged) {
        console.log('Anda belum login')
      } else {
        if (isLogged.role !== 'dokter') {
          View.menuFail('tidak memiliki akses untuk add patient')
        } else {
          Patient.create(patient, (errCreate) => {
            if (errCreate) {
              View.showError('Gagal Create')
            } else {
              Patient.findAll((errData, patientData) => {
                if (errData){
                  View.showError('Error')
                } else {
                  View.addSuccess(patientData.length)
                }
              })
            }
          })
        }
      }
    })
  }
}

module.exports = Controller

// Controller.addPatient(["maman", "gejala tipus"]) // Dummy test