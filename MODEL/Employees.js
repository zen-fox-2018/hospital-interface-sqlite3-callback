const db = require('../database/connection.js')

class Employees {
    constructor(name, position, username, password) {
      this.name = name
      this.position = position
      this.username = username
      this.password = password
    }

    static findAll (callback) {
     let query = `SELECT * FROM Employees`
      
        db.all(query,function(err,data){
          if(err){
            callback(err,null)
          }else {
            callback(null,data)
          }
        })
    }
    static create(input,callback){
      let queryData = `INSERT INTO Employees (name, position, username, password )
                   VALUES (
                     "${input.name}",
                      "${input.position}",  
                      "${input.username}",
                      "${input.password}"
                   )`
          db.run(queryData,function(err){
            if(err){
              callback(err)
            }else{
              callback()
            }
          })
    }

    static update(input,callback){
        let query = `UPDATE Employees
                     SET isLogin = 1
                     WHERE id = ${input}`
        db.run(query,function(err){
            if(err){
                callback(err)
            }else{
                callback()
            }
          
        })
    }

    static findWhere (input,callback) {
      let query = `SELECT `
      // Employees.findAll(function(err,data){
      //   if(err){
      //     callback(err,null)
      //   }else{
      //     let cek = false
      //     let dataUser = ''
      //     for(let i = 0; i < data.length; i++){
      //       if(data[i].username == input.username && data[i].password == input.password){
      //         cek = true
      //         dataUser = data[i]
      //         Employees.update(data[i].id,function(err){
      //           if(err){
      //             callback(err)
      //           }
      //         })
      //       }                  
      //     }
      //     if(cek){
      //       callback(null,dataUser)
      //     }
      //   }
      // })
    }

  }

 

module.exports = Employees
  