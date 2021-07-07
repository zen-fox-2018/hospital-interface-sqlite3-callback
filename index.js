const command = process.argv.slice(2)
const HospitalController = require('./controller/controller.js')

switch (command[0]) {
    case 'register':
        let name = command[1]
        let username = command[2]
        let password = command[3]
        let position = command[4]
        let loginStatus = command[5]
        HospitalController.entryEmployee(name,username,password,position, loginStatus)
        break;
    case 'showAll':
        HospitalController.showAllEmployee()
        break;
    case 'findEmployee':
        HospitalController.findEmployee(command[1])
    case 'login':
        HospitalController.loginEmployee(command[1], command[2])
        break;
    case 'addPatient':
        let namaPasien = command[1]
        let diagnosis = command.slice(2).join(',')
        
        HospitalController.addPatient(namaPasien, diagnosis)
    default:
        break;
}
