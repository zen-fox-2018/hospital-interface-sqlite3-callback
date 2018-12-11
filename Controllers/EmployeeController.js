const Employee = require('../Models/Employee')
const Patient = require('../Models/Patient')
const View = require('../Views/View')

class EmployeeController {

    static register(input) {
        let data = {
            username:input[0],
            password: input[1],
            role:input[2]
        }
        Employee.create(data, function (err) {
            if (err) {
                View.displayErr(err)
            } else {
                Employee.CountEmployee(function(err,length) {
                    if (err) {
                        View.displayErr(err)
                    } else {
                        console.log(length)
                        View.displaySucessregister(`save data ${input[0]} success. Total employee: ${length[0].totalEmployee}`)
                    }
                })
            }
        })

    }

    static login(input) {
        let data = {field: "username", value: input[0]}
        Employee.findWhere( data, function(err, row) {
            if (err) {
                View.displayErr(err)
            } else {
                if (row) {
                    if (typeof row.id == undefined) {
                        View.displayErr("silahkan login erlebih dahulu")
                    } else {
                        if (row.password !== input[1]) {
                            View.displayErr(`password salah`)
                        } else {
                            let checlogin = {field: "login", value: 1}
                            Employee.findWhere(checlogin, function (err, login) {
                                if (err) {
                                    View.displayErr(err)
                                } else {
                                    // console.log(login.length)
                                    if (login.id !== undefined) {
                                        View.displayErr('yang bisa login hanya satu orang')
                                    } else {
                                        let change = {
                                            field:"login",
                                            value: 1
                                        }
                                        row.update(change,function (err) {
                                            if (err) {
                                                View.displayErr(err)
                                            } else {
                                                View.displaysuccesslogin(input[0])
                                            }
                                        }) 
                                    }
                                }
                            }) 
                            
                        }  
                    }
                        
                }
            } 
        })
    }

    static logout() {
        let checklogin = {
            field: "login",
            value: 1
        }
        Employee.findWhere(checklogin, function (err, row) {
            if (err) {
                View.displayErr(err)
            } else {
                if (row.id === undefined) {
                    View.displayErr("tidak ada yang login")
                } else {
                    checklogin.value = 0
                    row.update(checklogin, function(err, data) {
                        if (err) {
                            View.displayErr(err)
                        } else {
                            View.displaysuccesslogout(data)
                        }
                    })

                }
            }
        })
    }

    static addPatient(input) {
        let data = { field: "login", value: 1}
        Employee.findWhere(data, function (err, row) {
            if (err) {
                View.displayErr(err)
            } else {
                if (row.id === undefined) {
                    View.displayErr('silahkan login terlebih dahulu')
                } else {
                    if (row.role !== "dokter") {
                        View.displayErr(`anda tidak punya akses`)
                    } else {
                        let diagnosa = input.slice(1).join(",")
                        let patient= new Patient(null, input[0],diagnosa)
                        // console.log(patient)
                        patient.create( function(err,data) {
                            if (err) {
                                View.displayErr(err)
                            } else {
                                View.displaySucessregister(`data pasien berhasil di tambahkan`)
                            }
                        })
                    }


                }
            }
        })
    }
}

module.exports = EmployeeController