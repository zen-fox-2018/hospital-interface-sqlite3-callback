const Employee = require('./employeeModel.js');
const Patient = require('./patientModel.js');
const View = require('./view.js');


class Controller {
  // console.log('MASUK CONTROLLER');
  static register(username, password, role){
    var newUser = new Employee(username, password, role)
    newUser.create(function(errCreate) {
      if (errCreate) {
        View.errorCreateUser(errCreate);
      }
      else {
        Employee.findAll(function(errFindAll, dataAll) {
          if (errFindAll) {
            View.errorFind(errFindAll)
          }
          else {
            var user ={
              username : newUser.username,
              password : newUser.password,
              role : newUser.role
            }
            View.succesCreateUser(user,dataAll.length);
          }
        })
      }
    })
  }

  static login(username, password){
    Employee.findAll(function(errFindAll,data) {
      if (errFindAll) {
        View.errorFind(errFindAll);
      }
      else {
        // console.log(data)
        Employee.findWhere('isLogin', 'true', function(errFindOne, dataOne) {
          if (errFindOne) {
            View.errorFind(errFindOne);
          }
          else {
            if (dataOne.length == 0) {
              var succLogin = false;
              var userLogin = '';
              for (var j = 0; j < data.length; j++) {
                if (username == data[j].username && password == data[j].password){
                  userLogin = data[j].username;
                  Employee.updateIsLogin(data[j], 'true', function(errUpdate) {
                    if (errUpdate) {
                      View.errorUpdate(errUpdate);
                    }
                  })
                  succLogin = true;
                  break;
                }
                // console.log(data[i]);
              }
              if (succLogin == true) {
                View.successLogin(userLogin);
              }
              else {
                View.failLogin();
              }
            }
            else {
              View.somebodyIsLogin(dataOne[0].username);
            }
          }
        })
      }
    });
  }

  static addPatient(name, diagnose){
    Employee.findWhere('isLogin', 'true', function(errFindWhere, dataLogin) {
      if (errFindWhere) {
        View.errorFind(errFindWhere);
      }
      else {
        if (dataLogin[0].role == 'dokter') {
          var newPatient = new Patient(name, diagnose);
          newPatient.create(function (errCreate) {
            if (errCreate) {
              View.failAddPatient(errCreate);
            }
            else {
              Patient.findAll(function(errFindAll, dataAll) {
                if (errFindAll) {
                  View.errorFind(errFindAll)
                }
                else {
                  View.succesCreatePatient(dataAll.length);
                }
              })
            }
          })
        }
        else {
          View.notDoctor();
        }
      }
    })
  }

  static logout(){
    Employee.findWhere('isLogin', 'true', function(errFindWhere, dataLogin) {
      if (errFindWhere) {
        View.errorFind(errFindWhere);
      }
      else {
        if (dataLogin.length > 0) {
          var user = dataLogin[0].username;
          Employee.updateIsLogin(dataLogin[0], 'false', function(errUpdate) {
            if (errUpdate) {
              View.errorUpdate(errUpdate);
            }
          })
          View.successLogout(user);
        }
        else {
          View.nobodyLogin();
        }
      }
    })
  }
}



module.exports = Controller;
