const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('hospital.db');

class Employee {
  // console.log('MASUK EMPLOYEE');
  constructor( username, password, role) {
    this.username = username;
    this.password = password;
    this.role = role;
    this.isLogin = false;
  }

  create(callback){
    var createUser = `INSERT INTO Employees
                      (username, password, role, isLogin)
                      VALUES
                      ("${this.username}", "${this.password}", "${this.role}", "${this.isLogin}")`;
    db.run(createUser, function(errCreate, data) {
      if (errCreate) {
        callback(errCreate,null);
      }
      else {
        callback(null,data);
      }
    })
    // db.close();
  }

  static findAll(callback){
    var query = `SELECT *
                 FROM Employees;`;
    db.all(query, function(errFindAll, data) {
      if (errFindAll) {
        callback(errFindAll, null);
      }
      else {
        callback(null, data);
      }
    })
    // db.close();
  }


  static updateIsLogin(data, loginStatus, callback){
    // console.log(data);
    var update = `UPDATE Employees
                  SET
                  username = "${data.username}",
                  password = "${data.password}",
                  role = "${data.role}",
                  isLogin = "${loginStatus}"

                  WHERE id = "${data.id}";`;
    db.run(update, function(errUpdate) {
      if (errUpdate) {
        callback(errUpdate);
      }
    })
    // db.close();
  }

  static findWhere(parameter, value, callback){
    var query = `SELECT *
                 FROM Employees
                 WHERE ${parameter} = "${value}"`;
    db.all(query, function(errFindOne, data) {
      if (errFindOne) {
        callback(errFindOne,null);
      }
      else {
        callback(null, data);
      }
    })
  }

  static dbClose(){
    db.close();
  }
}
// console.log(db);
// Employee.findOne();
// db.close();
module.exports = Employee;
