const argv = process.argv.slice(2)
const Controller = require('./controller/controller.js');

const command = argv[0];


switch (command) {
    case 'register':
        Controller.register(argv[1], argv[1], argv[2], argv[3], 0)
        break;

    default:
        break;
}


