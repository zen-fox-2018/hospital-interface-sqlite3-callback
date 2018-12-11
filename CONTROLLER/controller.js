
const Patients = require('../MODEL/patients.js')
const Employee = require('../MODEL/Employees.js')
const View = require('../VIEW/view.js')
class Controller {
    static taskRegister(input){
        Employee.create(input, function(err){
            if(err){
               View.viewError(err)
            }else {
                Employee.findAll(function(err,data) {
                    if(err){
                        View.viewError(err)
                    }else{
                        View.viewSucced(input,data)
                    }
                })
               
               // View.inputView(input)
            }
        })
    }
    static login(input) {
      
        Employee.findWhere(input,function(err,data){
            if(err){
                View.viewError(err)
            }else if (data === undefined) {
                View.wrongPass()
            }else {
                View.loginSucced(data)
            }

        })
    }

    static addPatients(input) {
        Employee.findAll(function(err,data){
            if(err){
                View.viewError(err)
            }else{
                let isLogin = false
                let doctor = ''
                for(let i = 0; i < data.length; i++){
                    if(data[i].isLogin == 1){
                        doctor = data[i].position
                        isLogin = true
                    }
                       
                }

                if(isLogin && doctor == "dokter") {
                    Patients.addPatients(input,function(err,dataPasien){
                        if(err){
                            View.viewError(err)
                        }
                    })

                    Patients.findAll(function (err,data) {
                        if(err){
                            View.viewError(err)
                        }else {
                            View.succedAddPatient(input,data)
                        }
                    })
                }else {
                    View.notDoctor()
                }
            }
        })
    }

}

module.exports = Controller