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

    static loginEmployee(name, password){
        Employee.findOne('isLogin', 1 , (err, data)=> {
            if(err) View.showErr(err)
            else {
                if(data.length) {
                    View.alreadyLogin()
                } else {
                    Employee.findOne('username', name, (errFindUsername, dataEmployee)=> {
                        if(errFindUsername) View.showErr(errFindUsername)
                        else {
                            if(dataEmployee.length == 0) {
                                View.showFailLogin()
                            } else if(dataEmployee[0].password == password) {
                                Employee.updateIsLogin(dataEmployee[0].id, (errUpdate)=> {
                                    if(errUpdate) {
                                        View.showErr(errUpdate)
                                    } else {
                                        View.successLogin(name)
                                    }
                                })
                            }   else{
                                View.showFailLogin()
                            }
                        }
                    })
                }
            }
        })
    }

    static logoutEmployee() {
        Employee.findOne('isLogin', 1, (err, data)=> {
            if(err) View.showErr(err)
            else {
                if(!data.length) {
                    View.needLogin()
                } else {
                    Employee.updateIsLogout(data[0].id, (errUpdate)=> {
                        if(errUpdate) {
                            View.showErr(errUpdate)
                        } else {
                            View.successLogout(data[0].username)
                        }
                    })
                }
            }
        })
    }

    static addPatient(name, diagnosis) {
        Employee.findOne('isLogin', 1, (err, data)=> {
            if(err) View.showErr(err)
            else {
                if(!data.length) {
                    View.needLogin()
                } else {
                    if(data[0].posisition != 'dokter') {
                        View.showNoAccess()
                    } else {
                        Patient.insertPatient(name, diagnosis , (errAddData)=> {
                            if(errAddData) View.showErr(errAddData)
                            else {
                                Patient.CountPatient((errCount, dataCount)=> {
                                    if(errCount) View.showErr(errCount)
                                    else {      
                                        View.successAddPatient(dataCount[0].total)
                                    }
                                })
                            }
                        })
                    }
                }
            }
        })
    }
}
module.exports = Controller