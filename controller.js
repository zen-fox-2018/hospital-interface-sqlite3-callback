const Employee = require('./models/employee.js');
const Patient = require('./models/patient.js');
const View = require('./view.js');

class Controller {

    static controlSearch() {
        Employee.findAll((err, data) => {
            if (err) {
                View.showError(err);
            } else {
                View.viewData(data);
            }
        });

    }

    static controlReg(name, position, username, password) {
        Employee.insertData(name, position, username, password, (err) => {
            if (err) {
                View.showError(err);
            } else {
                Employee.findAll((err, data) => {
                    if (err) {
                        View.showError(err);
                    } else {
                        View.successReg(data);
                    }
                });
            }
        });
    }

    static controlLogin(username, password) {

        Employee.findOne('isLogin', 1, (err, data) => {
            if (err) {
                View.showError(err);
            } else {
                if (data) {
                    View.showError('Gagal Login');
                } else {
                    Employee.findOne('username', username, (err, data) => {
                        if (err) {
                            View.showError(err);
                        } else {
                            if (!data) {
                                View.failedLogin();
                            } else {
                                if (password !== data.password) {
                                    View.failedLogin();
                                } else {
                                    Employee.updateLogin(username, (err) => {
                                        if (err) {
                                            View.showError(err);
                                        }
                                    });
                                    View.successLogin(username);
                                }
                            }
                        }
                    });
                }
            }
        });
    }

    static addPatient(name, diagnosis) {

        Employee.findOne('isLogin', 1, (err, data) => {
            if (err) {
                View.showError(err);
            } else {
                if (data.position === 'dokter') {
                    Patient.addData(name, diagnosis, (err) => {
                        if (err) {
                            View.showError(err);
                        } else {
                            Patient.findAll((err, dataPatient) => {
                                if (err) {
                                    View.showError(err);
                                } else {
                                    View.successAddPatient(dataPatient);
                                }
                            });
                        }
                    });

                } else {
                    View.showError('tidak memiliki akses untuk add patient');
                }
            }
        });
    }

}

module.exports = Controller;