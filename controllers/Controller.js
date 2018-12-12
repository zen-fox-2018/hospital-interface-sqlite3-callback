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
        Employee.insertDataEmployee(name, username, password, role,(err) =>{
            if(err) View.showErr(err)
            else {
                Employee.CountEmployee((errFind, dataCount)=> {
                    if(errFind) View.showErr(errFind)
                    else View.showSuccess(dataCount.total)
                })
            }
        })
    }

    static loginEmployee(name, password){
        Employee.findOne('isLogin', 1 , (err, data)=> {
            if(err) View.showErr(err)
            else {
                if(data) {
                    View.alreadyLogin()
                } else {
                    Employee.findOne('username', name, (errFindUsername, dataEmployee)=> {
                        // console.log(dataEmployee);
                        
                        if(errFindUsername) View.showErr(errFindUsername)
                        else {
                            if(!dataEmployee) {
                                View.showFailLogin()
                            } else if(dataEmployee.password == password) {
                                Employee.updateData(dataEmployee.id, 1, 'isLogin', (errUpdate)=> {
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
                if(!data) {
                    View.needLogin()
                } else {
                    Employee.updateData(data.id, 0, 'isLogin', (errUpdate)=> {
                        if(errUpdate) {
                            View.showErr(errUpdate)
                        } else {
                            View.successLogout(data.username)
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
                if(!data) {
                    View.needLogin()
                } else {
                    if(data.posisition != 'dokter') {
                        View.showNoAccess()
                    } else {
                        Patient.insertPatient(name, diagnosis , (errAddData)=> {
                            if(errAddData) View.showErr(errAddData)
                            else {
                                Patient.CountPatient((errCount, dataCount)=> {
                                    if(errCount) View.showErr(errCount)
                                    else {      
                                        View.successAddPatient(dataCount.total)
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