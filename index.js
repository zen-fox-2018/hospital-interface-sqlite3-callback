const argv = process.argv.slice(2);
const Controller = require('./controller.js');

class Index {
    constructor(command) {
        this.command = command;
        this.indexCommand();
    }

    indexCommand() {

        switch (this.command) {
            case 'search':
                Controller.controlSearch();
                break;

            case 'register':
                Controller.controlReg(argv[1], argv[2], argv[3], argv[4]);
                break;

            case 'login':
                Controller.controlLogin(argv[1], argv[2]);
                break;

            case 'addPatient':
                Controller.addPatient(argv[1], argv.slice(2).join(' '));
                break;
            default:
                break;
        }
    }
}

let index = new Index(argv[0]);