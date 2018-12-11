const argv = process.argv.slice(2);
const command = argv[0];
const Controller = require('./controller/Controller.js');

switch (command) {

  case 'findAll':
    Controller.allData();
    break;

  case 'register':
    let name = argv[1];
    let username = argv[2];
    let password = argv[3];
    let position = argv[4];
    Controller.registration(name, username, password, position);
    break;

  case 'login':
    Controller.login(argv[1], argv[2]);
    break;

  case 'addPatient':
    Controller.addPatient(argv[1], argv.slice(2));
    break;
    
}
