const Employee = require ('../Models/Employee.js')
const Patient = require ('../Models/Patient.js')
const View = require ('../Views/view.js')


class Controller {
    static register (name, position, username, password) {
        Employee.findOne("username",username, function(err, dataFind) {
            if(err) {
                View.showError(err)
            }else{
                if(dataFind == undefined){ 
                    Employee.create(name, position, username, password, function(errCreate, newEmployee){
                        if(errCreate) {
                            View.showError(errCreate)
                        }else{
                            Employee.count(function(errCount, dataCount){
                                if(err) {
                                    View.showError(errCount)
                                }else{
                                    let count = dataCount
                                    let input = `{"username":${newEmployee.username}, "password":${newEmployee.password}, "role":${newEmployee.position}. Total Employee : ${count}}`
                                    View.showSucsesscreate(input)
                                }
                            })      
                        }
                    })
                }else {
                    View.showError('cari username lain')
                }
            }
        })
    }

    static login (username, password) {
        Employee.findOne("login", "true", function(err, data) {
            if (err) {
                View.showError(err)
            }else{
                if(data == undefined) {
                    Employee.findOne("username", username, function(errFindUser, userLogin){
                        if(errFindUser) {
                            View.showError(errFindUser)
                        }else{
                            if(userLogin.password == password) {
                                Employee.update("login", "true", userLogin.id, function(errLogin) {
                                    if(errLogin) {
                                        View.showError(errLogin)
                                    }else{
                                        let input = `user ${username} logged in successfully`
                                        View.shows(input)  
                                    }
                                })
                            }else{
                                let input = `username or password wrong`
                                View.shows(input)
                            }
                        }
                    })
                }else{
                    let input = `ada yang login`
                    View.shows(input)
                }
            }
        })
    }

    static addPatient (input) {
        let nama = input[0]
        let diagnosa = input.slice(1)
        Employee.findOne("login", "true", function(err, data) {
            if(err) {
                //show err
            }else {
                if(data.position == "dokter") {
                    //bisa add pasien
                    Patient.create(nama, diagnosa,function(errAdd, patient){
                        if(errAdd) {
                            console.log(errAdd)
                        }else{
                            Patient.count(function(errCount, count) {
                                if(errCount) {
                                 View.showError(errCount)   
                                }else{
                                    let input = `data pasien berhasil dtambahkan. Total data Pasien : ${count}`
                                    View.shows(input)
                                }
                            })
                        }
                    })

                }else{
                    let input = `tidak memiliki akses untuk add patient`
                    View.showError(input)
                }
            }
            
        })
        //masuk ke model pasien
    }
}


module.exports = Controller;