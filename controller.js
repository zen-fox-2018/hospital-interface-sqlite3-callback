const View = require('./view.js')
const Employee = require('./model/employee.js')
const Patient = require('./model/patient.js')

class Controller {
    static register(username, password, position) {
        let newEmployee = new Employee(username, position, username, password)

        Employee.insert(newEmployee, function (err) {
            if (err) {
                View.error(err, "registration failed");
            } else {
                Employee.findAll(function (err, allData) {
                    if (err) {
                        View.error(err, "registration failed");
                    } else {
                        View.display(`save data success ${newEmployee}. Total Employee: ${allData.length}`)
                    }
                })
            }
        })
    }

    static login(username, password) {
        Employee.findAll(function (errFindAll, allData) {
            if (errFindAll) {
                View.error(errFindAll, "Find Employee error ")
            } else {
                let user = null
                let isDoubleLogin = false

                for (let i = 0; i < allData.length; i++) {
                    if (allData[i].username == username && allData[i].password == password) {
                        user = allData[i]
                    }

                    if (allData[i].isLogin !== 'false') {
                        isDoubleLogin = true
                    }
                }

                if (user == null) {
                    View.display('Anda belum terdaftar')
                } 
                else if (isDoubleLogin) {
                    View.display('User lain sedang login')
                } else {
                    Employee.update('isLogin', 'true', user.id, function (errUpdate) {
                        if (errUpdate) {
                            View.error(errUpdate, "data update failed");
                        } else {
                            View.display(`user ${user.username} logged in successfully`)
                        }
                    })
                }
            }
        })
    }


    static addPatient(patientName, diagnosis) {
        Employee.findAll(function (err, allData) {
            if (err) {
                View.error(err, "login failed")
            } else {
                let isLogin = false
                let user = null
                for (let i = 0; i < allData.length; i++) {
                    if (allData[i].isLogin !== 'false') {
                        isLogin = true
                        user = allData[i]
                    }
                }
                if (!isLogin) {
                    View.display('anda belum login')
                } else {

                    if (user.position !== 'dokter') {
                        View.display('anda tidak memiliki akses untuk add patient')
                    } else {
                        let newPatient = new Patient(patientName, diagnosis)

                        Patient.insert(newPatient, function (err) {
                            if (err) {
                                View.error(err, 'Patient registration error')
                            } else {
                                Patient.findAll(function (err, allData) {
                                    if (err) {
                                        View.error(err, 'Patient registration error')
                                    } else {
                                        View.display(`data pasien berhasil ditambahkan. Total data pasien: ${allData.length}`)
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
