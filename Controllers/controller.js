
const Employees = require("../Models/employee");
const Patient = require("../Models/patient");
const View = require("../Views/view");

class Controller {

    static register(name, position, username, password) {
        let newData = new Employees(name, position, username, password);
        Employees.create(newData, function(err, data) {
            if(err) {
                View.showError(err)
            } else {
                View.showRegistered(data)
            }
        })
    }

    static login(username, password) {
        Employees.findOne("isLogin", 1, function(err, loggedIn) {
            if(err) {
                View.showError(err)
            } else {
                if(loggedIn) {
                    View.showError("Someone has already logged in!")
                } else {
                    Employees.findOne("username", username, function(err, users) {
                        if(err) {
                            View.showError(err)
                        } else {
                            if(users.password !== password) {
                                View.showError("Wrong password!")
                            } else {
                                Employees.update("isLogin", 1, users.id, function(err, data) {
                                    if(err) {
                                        View.showError(err)
                                    } else {
                                        View.showLogin("You have successfully logged in!")
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })
    }

    static delete(id) {
        Employees.delete(id, function(err, data) {
            if(err) {
                View.showDeleted(err)
            } else {
                View.showDeleted(data)
            }
        })
    }

    static update(column, value, id) {

        Employees.update(column, value, id, function(err, data) {
            if(err) {
                View.showUpdated(err)
            } else {
                View.showUpdated(data)
            }
        })
    }

    static addPatients(name, diagnosis) {
        Employees.findOne("isLogin", 1, function(err, loggedIn) {
            if(err) {
                View.showError(err)
            } else {
                Employees.findOne("position", "dokter", function(err, doctor) {
                    if(err) {
                        View.showError(err)
                    } else {
                        if(!doctor) {
                            View.showError("You do not have the access!")
                        } else {
                            let addNewPatient = new Patient(name, diagnosis);
                            Patient.createPatient(addNewPatient, function(err, data) {
                                if(err) {
                                    View.showError(err)
                                } else {
                                    View.showAddPtient(data)
                                }
                            })
                        }
                    }
                })
            }
        })
    }
}

module.exports = Controller