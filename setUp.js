const openDb = require('./dataB')
// console.log(db())
const View = require('./views/View')

function empTable() {
  let qEmployee = `
  CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR,
    position VARCHAR,
    password VARCHAR
    )
  `
  let db = openDb();
  db.serialize(() => {
    db.run(qEmployee, (err) => {
      if (err) {
        View.error(`setting up employees table : \n`, err)
      } else {
        View.display(`setting up employees table!`)
        alterLogin() // harus dalam else?
      }
    })
   //alterLogin()
  })
  db.close((err) => {
    if(err) {
      View.error(`closing database (create employee table)`)
    } else {
      View.display(`closing database (create employee table)`)
    }
  })
}

function patTable() {
  let qPatients = `
  CREATE TABLE IF NOT EXISTS patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR,
    diagnosis TEXT
    )
  `
  let db = openDb()
  db.serialize(() => {
    db.run(qPatients, (err) => {
      if (err) {
        View.error(`setting up patients table : \n`, err)
      } else {
        View.display(`setting up patients table!`)
      }
    })
  })
  db.close((err) => {
    if(err) {
      View.error(`closing database (create patient table)`)
    } else {
      View.display(`closing database (create patient table)`)
    }
  })
}

function alterLogin(){
  let query = `
    ALTER TABLE employees 
    ADD COLUMN login INTEGER DEFAULT 0
  `
  let db = openDb()
  db.run(query, (err) => {
    if(err) {
      View.error(err)
    } else {
      View.display(`alter table add login`)
    }
  })
}

empTable()
patTable()
// alterLogin()