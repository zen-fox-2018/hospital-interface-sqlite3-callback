const Employee = require('../models/Employee.js')
const Patient = require('../models/Patient.js')
const View = require('../views/View.js')

class Controller {
    static searchEmployee() {
        Employee.findByAll((err,data)=> {
            if(err) View.showErr(err)
            else View.showData(data)
        })
    }
    static searchPatient() {
        Patient.findByAll((err,data)=> {
            if(err) View.showErr(err)
            else View.showData(data)
        })
    }

    static registerData(name, username, password, role) {
        Employee.insertDataEmployee(name, username, password, role,(err, msg) =>{
            if(err) View.showErr(err)
            else {
                Employee.findByAll((errFind, data)=> {
                    if(errFind) View.showErr(errFind)
                    else{
                        View.showSuccess(msg, data.length)
                    }
                }) 
            }
        })
    }

    static loginEmployee(name, password) {
        Employee.findByAll((err,data)=> {
            if(err) View.showErr(err)
            else{
                let tempCheckIsLogin = false
                let tempIndex = 0
                for(let i = 0; i < data.length; i++) {
                    if(data[i].isLogin == 0){
                        if(data[i].username == name && data[i].password == password) {
                            tempIndex = i + 1
                        }
                    } else {
                        tempCheckIsLogin = true
                    }
                }
                if (tempCheckIsLogin) {
                    View.alreadyLogin()
                }
                else if(!tempIndex) {
                    View.showFailLogin()
                } else {
                    Employee.updateIsLogin(tempIndex, (errUpdate)=> {
                        if(errUpdate) {
                            View.showErr(errUpdate)
                        } else {
                            View.successLogin(name)
                        }
                    })
                }
            }
        })
    }

    static logoutEmployee(name, password) {
        Employee.findByAll((err,data)=> {
            if(err) View.showErr(err)
            else{
                let tempIndex = 0
                for(let i = 0; i < data.length; i++) {
                    if(data[i].username == name && data[i].password == password) {
                        tempIndex = i + 1
                    }        
                }
                if(!tempIndex) {
                    View.showFailLogin()
                } else {
                    Employee.updateIsLogout(tempIndex, (errUpdate)=> {
                        if(errUpdate) {
                            View.showErr(errUpdate)
                        } else {
                            View.successLogout(name)
                        }
                    })
                }
            }
        })
    }

    static addPatient(name, diagnosis) {
        Employee.findByAll((err,data)=> {
            if(err) View.showErr(err)
            else {
                let tempIndex = 0
                for(let i = 0; i < data.length; i++){
                    if(data[i].isLogin == 1){
                        tempIndex = i + 1
                    }
                }
                if(!tempIndex) {
                    View.needLogin()
                } else {
                    if(data[tempIndex - 1].posisition == 'dokter') {
                        Patient.insertPatient(name, diagnosis, (errAdd)=> {
                            if(errAdd) View.showErr(errAdd)
                            else {
                                Patient.findByAll((errPatient,dataPatient)=> {
                                    if(errPatient) View.showErr(errPatient)
                                    else {
                                        View.successAddPatient(dataPatient.length)
                                    }
                                })
                            }
                        })
                    } else {
                        View.showNoAccess()
                    }
                }
            }
        })
    }
}
module.exports = Controller