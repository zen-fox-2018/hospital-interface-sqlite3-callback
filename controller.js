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

                Employee.findWhere(username, 'username', function(err, employeeData){
                    if(err){
                        View.error(err, 'findwhere error')
                    }   else{
                        
                        if(employeeData.length ===0){
                            View.display('Anda belum terdaftar')
                        }
                        else if(employeeData[0].password !==password){
                            View.display('usename/password salah')
                        }  else{

                            Employee.findWhere(1, 'isLogin', function(err, loginData){
                                if(err){
                                    View.error(err, 'check double Login error')
                                }  else{
                                    if(loginData.length !== 0){
                                        View.display('user lain sedang login')
                                    }   else{
                                        Employee.update('isLogin', 1, employeeData[0].id, function(err){
                                            if(err){
                                                View.error(err, 'update login status error')
                                            }   else{
                                                View.display(`user ${employeeData[0].name} login successfully`)
                                            }
                                        })
                                    }
                                }
                            })
                        } 
                    }
                })
            }
        })
    }


    static addPatient(patientName, diagnosis) {
        Employee.findAll(function (err, allData) {
            if (err) {
                View.error(err, "login failed")
            } else {
                
                Employee.findWhere(1, 'isLogin', function(err, loginData){
                    if(err){
                        View.error(er, 'find login status error')
                        }
                       else{
                        if(loginData.length == 0){
                            View.display('anda belum login')
                        }   else{
                            if(loginData[0].position!== 'dokter'){
                                View.display('anda tidak memiliki akses untuk add patient')
                            }   else{
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
        })
    }
}

module.exports = Controller
