const Employee = require('../models/Employee.js')
const View = require('../view/view.js')
const Patient = require('../models/Patient.js')

class HospitalController {

    static addPatient(name, diagnosis) {
        Employee.readEmployee(function (err, data) {
            if (err) {
                View.showErrorMessage(err)
            }
            else {
                let dataEmployee = data
                let isDoctor = false
                for (let i = 0; i < dataEmployee.length; i++) {
                    if (dataEmployee[i].loginStatus === 1 && dataEmployee[i].position == 'dokter') {
                        isDoctor = true
                    }
                }
                if (isDoctor === true) {
                    let objPatient = new Patient(name, diagnosis)
                    Patient.addPatient(objPatient, function (err) {
                        if (err) {
                            View.showErrorMessage(err)
                        }
                        else {
                            Patient.readPatient(function (err, rows) {
                                if (err) {
                                    View.showErrorMessage(err)
                                }
                                else {
                                    View.showSuccessPatientMessage(rows)
                                }
                            })
                        }
                    })
                }
                else {
                    View.showErrorPatientMessage()
                }
            }
        })


    }

    static entryEmployee(name, username, password, position, loginStatus) {

        let objEmployee = new Employee(name, position, username, password, loginStatus)

        Employee.addEmployee(objEmployee, function (err) {
            if (err) {
                View.showErrorMessage(err)
            }
            else {
                Employee.readEmployee(function (errRead, data) {
                    if (err) {
                        View.showErrorMessage(errRead)
                    }
                    else {
                        View.showSuccessMessage(data)
                    }
                })
            }
        })
    }

    static showAllEmployee() {
        Employee.readEmployee(function (err, rows) {
            if (err) {
                View.showErrorMessage(err)
            }
            else {
                View.showAllMessage(rows)
            }
        })
    }

    static findEmployee(id) {
        Employee.findEmployeeById(id, function (err, dataRow) {
            if (err) {
                View.showErrorMessage(err)
            }
            else {
                View.showAllMessage(dataRow)
            }
        })
    }

    static loginEmployee(username, password) {

        Employee.readEmployee(function (err, data) {
            if (err) {
                View.showErrorMessage(err)
            }
            else {
                let sumberData = data
                let statusLogin = false
                let sedangLogin = false
                let indeks = 0

                for (let i = 0; i < sumberData.length; i++) {
                    if (sumberData[i].loginStatus == 1) {
                        sedangLogin = true
                    }
                }
                if (sedangLogin === true) {
                    View.showAllMessage(`User lain sedang mengakses sistem`)
                }
                else {
                    for (let i = 0; i < sumberData.length; i++) {
                        if (sumberData[i].username === username && password === sumberData[i].password) {
                            sumberData[i].loginStatus = 1
                            statusLogin = true
                            indeks = i
                        }
                    }
                    if (statusLogin === false) {
                        View.showAllMessage(`username / password wrong`)
                    }
                    else {
                        // View.showAllMessage(`user ${sumberData[indeks].username} logged in successfuly`)
                        Employee.update('loginStatus', 1, indeks + 1, function (err) {
                            if (err) {
                                View.showErrorMessage(err)
                            }
                            else {
                                View.showAllMessage(`user ${sumberData[indeks].username} logged in successfuly`)
                            }
                        })
                    }

                }



            }
        })

    }


}

module.exports = HospitalController