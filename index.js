const args = process.argv.slice(2);
const Controller = require("./Controllers/controller")
const command = args[0];

switch (command) {
    case "register":
        Controller.register(args[1], args[2], args[3], args[4])
        break;
    case "login" :
        Controller.login(args[1], args[2])
        break;
    case "delete" :
        Controller.delete(args[1])
        break;
    case "findAll" :
        Controller.findAll()
        break;
    case 'update' :
        Controller.update(args[1], args[2])
        break;
    case "addPatient":
        Controller.addPatients(args[1], args[2]);
        break;
    default:
}