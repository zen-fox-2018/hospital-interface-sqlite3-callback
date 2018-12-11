const Controller = require('./controllers/Controller.js')
const argv = process.argv.slice(2)

class Index {
  constructor(command) {
    this.command = command
  }
  getCommand() {
    switch (this.command[0]) {
      case 'register':
        Controller.register([this.command[1], this.command[2], this.command[3]])
        break;
      case 'login':
        Controller.login([this.command[1], this.command[2]])
        break;
      case 'logout':
        Controller.logout()
        break;
      case 'addPatient':
        Controller.addPatient([this.command[1], this.command[2]])
        break;
      default:
        // Controller.menuHelp()
        break;
    }
  }
}

let start = new Index(argv)
start.getCommand()