const View = require('./viewEmployee.js')
const Model = require('./modelEmployee.js')

class EmployeeController {
    static search() {
        Model.findAll((err, data) => {
            if (err) {
                View.findError(err)
            } else {
                View.findSucceed(data)
            }
        })
    }
    
    static register(name, username, password, role) {
        Model.register(name, username, password, role, (err, registeredData) => {
            if (err) {
                View.registerError(err, null)
            } else {
                Model.findAll((err, data) => {
                    if (err) {
                        View.findError(err, null)
                    } else {
                        View.registerSuccess(data)
                    }
                })
            }
        })
    }

    static login(username, password) {
        Model.loggingIn(username, password, (err, data) => {
            if (err) {
                View.loginError(err)
            } else {
                View.loginSuccessfull()
            }
        })
       
    }
}

module.exports = EmployeeController
