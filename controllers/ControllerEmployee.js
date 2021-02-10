const Employee = require('../models/Employee')
const Patient = require('../models/Patient')
const View = require('../views/View')
const bcrypt = require('bcryptjs')

class ControllerEmployee {

    static register(obj) {
        let employee = new Employee(obj)
        employee.create((err, data) => {
            if (err) {
                View.displayError(err)
            } else {
                Employee.findAll((err, data) => {
                    err? View.displayError(err): View.register(obj, data.length)
                })
            }
        })
    }

    static login(obj) {
        let find = {
            status: 1
        }
        Employee.findOne(find, (err, data) => {
            if (err) {
                View.displayError(err)
            } else {
                if (data) {
                    View.displayError({msg: 'cannot login'})
                } else {
                    find = {
                        username: obj.username
                    }
                    Employee.findOne(find, (err, employee) => {
                        if (err) {
                            View.displayError(err)
                        } else {
                            if (!employee) {
                                View.displayError({msg: 'wrong username'})
                            } else {
                                bcrypt.compare(obj.password, employee.password, (err, res) => {
                                    if (err) {
                                        View.displayError(err)
                                    } else {
                                        if (!res) {
                                            View.displayError({msg: 'wrong password'})
                                        } else {
                                            let find = {
                                                status: 1
                                            }
                                            employee.update(find, (err, data) => {
                                                if (err) {
                                                    View.displayError(err)
                                                } else {
                                                    View.login(employee.username)
                                                }
                                            })   
                                        }
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })
    }

    static logout(obj) {
        let find = {
            username: obj.username
        }
        Employee.findOne(find, (err, employee) => {
            if (err) {
                View.displayError(err)
            } else {
                let find = {
                    status: 0
                }
                employee.update(find, (err, data) => {
                    if (err) {
                        View.displayError(err)
                    } else {
                        View.logout(employee.username)
                    }
                })
            }
        })
    }

    static addPatient(obj) {
        let find = {
            status: 1
        }
        Employee.findOne(find, (err, data) => {
            if (err) {
                View.displayError(err)
            } else {
                if (!data) {
                    View.displayError({msg: 'please login as a doctor'})
                } else {
                    if (data.role !== 'dokter') {
                        View.displayError({msg: 'tidak memiliki akses untuk add patient'})
                    } else {
                        let patient = new Patient(obj)
                        patient.diagnosis = patient.diagnosis.join(', ')
                        patient.create((err, data) => {
                            if (err) {
                                View.displayError(err)
                            } else {
                                Patient.findAll((err, data) => {
                                    if (err) {
                                        View.displayError(err)
                                    } else {
                                        View.displayPatient(data.length)
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

module.exports = ControllerEmployee