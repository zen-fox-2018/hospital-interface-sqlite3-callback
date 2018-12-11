const Employee = require(`../Models/Employee`)
const Patient = require(`../Models/Patient`)
const View = require(`../Views/View`)
const bcrypt = require(`bcryptjs`)

class Controller {
    static register(username, password, role) {
        let employee = new Employee({
            username: username,
            password: password,
            role: role,
            isLogin: false
        })
        
        Employee.readOne(`username`, username, function (err, data) {
            err ?
                View.errorRegister(`error register`) :
                data != undefined ?
                    data.username == username &&
                    View.errorLogin(`username sudah ada`) :
                    employee.create(username, password, role, function (err, data) {
                        err ?
                            View.errorRegister(`error register`) :
                            Employee.readAll(function (err, data) {
                                View.successRegister(`success register success, Total Employee: ${data.length}`)
                            })
                    })
        })
    }

    static login(username, password) {
        Employee.readOne(`isLogin`, true, function (err, data) {
            err ?
                View.errorLogin(`something went wrong`) :
                data != undefined ?
                    View.errorLogin(`${data.username} sedang login, kamu tidak bisa login`) :
                    Employee.readOne(`username`, username, function (err, data) {
                        bcrypt.compare(password, data.password, function (err, res) {
                            res == true ?
                                Employee.update(`username`, username, `isLogin`, "true", function (err, data) {
                                    err ?
                                        View.errorLogin(err) :
                                        View.successLogin(`success login ${username}`)
                                }) :
                                View.errorLogin(`salah password`)
                        })
                    })
        })
    }

    static addPatient(name, disease) {
        Employee.readOne(`role`, `dokter`, function (err, data) {
            err ?
                View.errorAddPatient(`something went wrong on add patient`) :
                !data ?
                    View.errorAddPatient(`kamu harus login sebagai dokter`) :
                    data.isLogin == true ?
                        Patient.create(name, disease, function (err, data) {
                            err ?
                                View.errorAddPatient(`error add patient`) :
                                View.successAddPatient(`success add patient`)
                        }) :
                        View.errorAddPatient(`kamu harus login sebagai dokter`)
        })
    }

    static logout(username) {
        Employee.readOne(`username`, username, function (err, data) {
            err ?
                View.errorLogout(`something went wrong`) :
                employee.update(`username`, username, `isLogin`, false, function (err) {
                    err ? 
                        View.errorLogout(`error logout`) :
                        View.successLogout(`${username} success logout`)
                })
        })
    }

}

module.exports = Controller