const argv = process.argv;
const command = argv.slice(2);
const Controller = require('./controller.js');

switch (command[0]) {
  case 'register':
    Controller.register(command[1], command[2], command[3]);
    break;
  case 'login':
    Controller.login(command[1], command[2]);
    break;
  case 'addPatient':
    var commandSlice = command.slice(2);
    var diagnose = commandSlice.join(' ');
    Controller.addPatient(command[1], diagnose)
    break;
    default:
  case 'logout':
    Controller.logout();
    break;
}
