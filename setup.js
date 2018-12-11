const db = require('./dbConnect.js');

let employee =
    `CREATE TABLE IF NOT EXISTS Employees
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    position VARCHAR(15),
    username TEXT,
    password TEXT,
    isLogin INTEGER
)`;

let patient =
    `CREATE TABLE IF NOT EXISTS Patients
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    diagnosis TEXT
)`;

db.serialize(() => {

    db.run(employee, (err) => {
        if (err) {
            console.log('ERR : ', err);
        } else {
            console.log('Creating table Employees');
        }
    });

    db.run(patient, (err) => {
        if (err) {
            console.log('ERR :', err);
        } else {
            console.log('Creating table Patients');
        }
    });

});

db.close((err) => {
    if (err) {
        console.log('ERR :', err);
    }
});