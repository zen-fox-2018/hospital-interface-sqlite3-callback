const Employee = require('../models/Employee.js')
const Patients = require('../models/Patients.js')
const View = require('../views/View.js')

class Controller {
    static register(input) {
        Employee.create(input, function(err) {
            if(err) {
                View.displayError('Add Data Failed', err)
            } else {
                Employee.findAll(function(err, employeeData) {
                    if(err) {
                        View.displayError('Err : ', err)
                    } else {
                        View.displaySuccess(`Success Add Data {name: ${input.name}, username: ${input.username}, position: ${input.position}}, Total Employee: ${employeeData.length}`)
                    }
                })
            }
        })
    }

    static login(input) {
        Employee.findOne({field: 'isLogin', value: 'true'}, function(err, row) {
            if(err) {
                View.displayError('Err :', err)
            } else {
                if(row) {
                    View.alert('Somebody is still log in!!')
                } else {
                    Employee.findOne({field: 'username', value: input.username}, function(err, dataEmp) {
                        if(err) {
                            View.displayError('Err : ', err)
                        } else {
                            if(!dataEmp) {
                                View.alert(`No username ${input.username} in system!!`)
                            } else if (input.password !== dataEmp.password){
                                View.alert(`Wrong Password!!`)
                            } else {
                                Employee.update({field: 'isLogin', value: 'true', username: dataEmp.username}, function(err) {
                                    if(err) {
                                        View.displayError('Err : ', err)
                                    } else {
                                        View.displaySuccess(`User ${dataEmp.username} Success Log in!!`)
                                    }
                                })
                            }
                        } 
                    })
                }
            }
        })
    }

    static logout(input) {
        Employee.findOne({field: 'isLogin', value: 'true'}, function(err, row) {
            if(err) {
                View.displayError('Err : ', err)
            } else {
                if(!row) {
                    View.alert('You are not Log in')
                } else {
                    Employee.findOne({field: 'username', value: input.username}, function(err, dataEmp) {
                        if(err) {
                            View.displayError(err)
                        } else {
                            if(!dataEmp) {
                                View.alert('No username is System!!')
                            } else {
                                Employee.update({field: 'isLogin', value: 'false', username: input.username}, function(err) {
                                    if(err) {
                                        View.displayError('Err : ', err)
                                    } else {
                                        View.displaySuccess(`User ${input.username} Success Log Out!`)
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })
    }

    static createPatients(input) {
        Employee.findOne({field: 'isLogin', value: 'true'}, function(err, row) {
            if(err) {
                View.displayError('Err : ', err)
            } else {
                if(row) {
                    View.alert('Please Log in as a doctor to add patients')
                } else {
                    Employee.findOne({field: 'position', value: 'docter'}, function(err, row) {
                        if(err) {
                            View.displayError('Err : ', err)
                        } else {
                            if(!row) {
                                View.alert('Only doctor can add patients')
                            } else {
                                Patients.create(input, function(err) {
                                    if(err) {
                                        View.displayError(err)
                                    } else {
                                        Patients.findAll(function(err, dataPatients) {
                                            if(err) {
                                                View.displayError('Err : ', err)
                                            } else {
                                                View.displaySuccess(`Success add Patient data. Total Patients: ${dataPatients.length}`)
                                            }
                                        })
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })
    }

    static deletePatients(input) {
        Employee.findOne({field: 'position', value: 'docter'}, function(err, dataEmp) {
            if(err) {
                View.displayError('Err : ', err)
            } else {
                if(!dataEmp) {
                    View.alert('You are not doctor')
                } else {
                    Patients.findOne({field: 'id', value: input.id}, function(err, dataPat) {
                        if(err) {
                            View.displayError('Err : ', err)
                        } else {
                            if(!dataPat) {
                                View.alert('Patient data not found!!')
                            } else {
                                Patients.delete(input.id, function(err) {
                                    if(err) {
                                        View.displayError('Err : ', err)
                                    } else {
                                        View.displaySuccess('Success Delete Patient Data')
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

module.exports = Controller