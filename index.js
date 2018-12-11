

const command = process.argv.slice(2)
const Controller = require('./CONTROLLER/controller.js')
// class input {
//     constructor(command) {
//         this.command = command
//     }
//     insertData() {
//         switch ""
//         if(this.command = 'register'){

//         }
//     }
// }

// let newCommand = input(command)

switch (command[0]) {
    

    case "register":
    let obj = {}
    obj.name = command[1],
    obj.position = command[2],
    obj.username = command[3],
    obj.password = command[4]
        Controller.taskRegister(obj)
        break;


    case "login":
    let objLogin = {}
    objLogin.username = command[1],
    objLogin.password = command[2]
    
        Controller.login(objLogin)
        break;

    case "addPatient":
    let objPatient = {}
    objPatient.name = command[1],
    objPatient.diagnose = command[2]

        Controller.addPatients(objPatient)
        break;

    default:
        break;
}