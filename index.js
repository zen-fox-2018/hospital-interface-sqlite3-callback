const Controller = require('./controller');
class userInput {
    constructor(input) {
        this.command = input
    }
    runTheCommand() {
        switch(this.command[0]) {
            case "register":
            Controller.registerEmployee(this.command[1], this.command[2], this.command[3], this.command[4]);
            break;
            case "login":
            Controller.logIn(this.command[1], this.command[2]);
            break;
            case "findAllEmployee":
            Controller.findAllEmployee();
            break;
            case "findById":
            Controller.findById(this.command[1]);
            break;
            case "addPatient":
            Controller.addPatient(this.command[1], this.command.slice(2));
            break 
            case "findAllPatient":
            Controller.findPatient()
            break;
        }
    }
}
const input = process.argv.slice(2)
const theInput = new userInput(input)
theInput.runTheCommand()
