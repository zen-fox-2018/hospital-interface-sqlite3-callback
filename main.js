const argv = process.argv.slice(2)
const Controller = require('./controllers/Controller')

Controller.execute(argv)