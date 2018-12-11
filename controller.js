const Employee = require('./Models/Employee');
const Patient = require('./Models/Patient');
const View = require('./view.js');
class hospitalController {
    static registerEmployee(name, position, username, password){
        Employee.register(name, position, username, password, function(err, employeeList) {
            if (err) {
                View.registerFailed()
            } else {
                View.registerSucceed(employeeList)
            }
        })
    }

    static logIn(username, password) {
        Employee.logInEmployee(username, password, function(err, name) {
            if (name === undefined) {
                View.cantlogin()
            } else if (err || name === false) {
                View.loginFailed()
            } else if (name != false){
                View.loginSucceed(name)
            } 
        });
    }

    static findAllEmployee(){
        Employee.findAllEmployee(function(err, dataEmployee) {
            if (err) {
                View.findEmployeesFailed(err)
            } else {
                View.findEmployeesSucceed(dataEmployee)
            }
        })
    }

    static findById(target) {
        Employee.findByIdEmployee(target, function(err, dataEmployee) {
            if (err) {
                View.findByIdFailed(err)
            } else {
                View.findByIdSucceed(dataEmployee)
            }
        })
    }

    static addPatient(name, diagnosis) {
        Employee.findAllEmployee(function(err, dataEmployee) {
            if (err) {
                View.addPatientFailed(err)
            } else {
                Patient.addNewPatient(name, diagnosis, dataEmployee, function(err, dataPatient) {
                    if (err) {
                        View.addPatientFailed(err)
                    } else {
                        View.addPatientSucceed(dataPatient)
                    }
                })
            }
        })
       
    }

    static findPatient() {
        Patient.findAllPatient(function(err, dataEmployee) {
            if (err) {
                View.findPatientFailed(err)
            } else {
                View.findPatientSucceed(dataEmployee)
            }
        })
    }
}

module.exports = hospitalController;
