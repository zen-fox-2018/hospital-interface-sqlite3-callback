const Employee = require('../models/employee')
const View = require('../view/view')

class Controller {

    static showData() {
        Employee.findAll(function (err, data) {
            if (err) {
                View.showDataErr(err)
            } else {
                View.showData(data)
            }
        })
    }

    static register(name, username, password, role, status) {
        Employee.createNew(name, username, password, role, status, function (errCreate) {
            if (errCreate) {
                View.showRegErr(errCreate)
            } else {
                Employee.findAll(function (err, data) {
                    if (err) {
                        View.showDataErr(err)
                    } else {
                        View.showRegDone(username, password, role, data)
                    }
                })
            }
        })
    }

    static login(username, password) {
        Employee.findOne('status', 1, function (errStatus, employeeStatus) {
            if (errStatus) {
                View.showDataErr(errStatus)
            } else {
                if (employeeStatus.length > 0) {
                    View.cantLogin(employeeStatus[0].username)
                } else {
                    Employee.findOne('username', username, function (errUsername, employeeUsername) {
                        if (errUsername) {
                            // View.noData(username)
                            // console.log(errUsername,'err username')
                            View.showDataErr(errUsername)
                        } else {
                            console.log(employeeUsername[0].id, 'ini id')
                            // console.log(password)
                            if (password == employeeUsername[0].password) {
                                // employeeUsername[0].status = 1
                                // update DB
                                Employee.update('status', 1, employeeUsername[0].id, function(errUpdate){
                                    if(errUpdate) {
                                        View.showDataErr(errUpdate)
                                    } else {
                                        View.canLogin(employeeUsername[0].name)
                                    }
                                })
                            } else {
                                View.wrongPassword()
                            }
                        }
                    })

                }
            }
        })
    }
}


module.exports = Controller


