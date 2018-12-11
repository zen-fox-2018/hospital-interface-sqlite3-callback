const Employees = require("../Models/employee");
const Patient = require("../Models/patient");
const View = require("../Views/view");

class Controller {

    static register(name, position, username, password) {
        let newData = new Employees(name, position, username, password);
        Employees.findOne("username", username, function(err, findData) {
            if(err) {
                View.showError(err)
            } else {
                if(findData) {
                    View.showError("Someone has already taken this username!")
                } else {
                    Employees.create(newData, function(err, data) {
                        if(err) {
                            View.showError(err)
                        } else {
                            View.showRegistered(data)
                        }
                    })
                }
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
                    Employees.findOne("isLogin", 0, function(err, nonLogin) {
                        if(err) {
                            View.showError(err)
                        } else {
                            Employees.findOne("username", username, function(err, users) {
                                if(err) {
                                    View.showError(err)
                                } else {
                                    
                                }
                            })
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

    static update(id, value1, value2, value3, value4) {

        let updateObj = {
            id : id,
            name: value1,
            position: value2,
            username: value3,
            password: value4
        }

        Employees.update(updateObj, function(err, data) {
            if(err) {
                View.showUpdated(err)
            } else {
                View.showUpdated(data)
            }
        })
    }

    static addPatients(name, diagnosis) {
        let addNewPatient = new Patient(name, diagnosis);

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
                            Patient.create(addNewPatient, function(err, data) {
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