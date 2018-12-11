const Employee = require('../models/employee')
const View = require('../view/view')

class  Controller{

    static showData() {
        Employee.findAll(function(err,data){
            if(err){
                View.showDataErr(err)
            } else {
                View.showData(data)
            }
        })
    }

    static register(name, username, password, role, status) {
        Employee.createNew(name, username, password, role, status,function(errCreate){
            if(errCreate) {
                View.showRegErr(errCreate)
            } else {
                Employee.findAll(function(err,data){
                    if(err){
                        View.showDataErr(err)
                    } else {
                        View.showRegDone(username,password,role,data)
                    }
                })
            }
        })
    }
}


module.exports = Controller


