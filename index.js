const argv = process.argv.slice(2)
const EmployeeController = require('./Controllers/EmployeeController')
const command = argv[0]
const input = argv.slice(1)
switch (command) {
    case "register" :
        EmployeeController.register(input)
        break;
    case "login" :
        EmployeeController.login(input)
        break;
    case "addpatient" :
        EmployeeController.addPatient(input)
        break;
    case "logout" :
        EmployeeController.logout()
        break;
    default:
        break;
}