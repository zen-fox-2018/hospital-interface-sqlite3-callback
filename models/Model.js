const db = require('../dataB')

class Model {
  static insert(table, obj, cb) {
    let field = Object.keys(obj)
    let values = []

    for (let i in obj) {
      if(isNaN(obj[i])) {
        values.push(`"${obj[i]}"`)
      } else {
        values.push(obj[i])
      }
    }

    let query = `
      INSERT INTO ${table} (${field.join(', ')}) 
      VALUES (${values.join(', ')})`

    db.run(query, (err) => {
      cb(err)
    })
  }

  static findAll(table, cb) {
    let query = `SELECT * FROM ${table}`
    db.all(query, (err, rows) => {
      if(err) {
        cb(err)
      } else {
        cb(rows)
      }
    })
  }

  static findOne (table, field, value, cb) {
    let val;
    if(isNaN(value)) {
      val = `"${value}"`
    } else {
      val = value
    }
    let query = `SELECT * FROM ${table} WHERE ${field} = ${val}`

    db.get(query, (err, row ) =>{
      if(err){
        cb(err)
      } else {
        cb(row)
      }
    })
  }

  static update(table, obj, cb){
    let value1;
    let value2;

    if(isNaN(obj.val1)) {
      value1 = `"${obj.val1}"`
    } else {
      value1 = obj.val1
    }

    if (isNaN(obj.val2)) {
      value2 = `"${obj.val2}"`
    } else {
      value2 = obj.val2
    }

    let query = `UPDATE ${table} SET ${obj.field1} = ${value1} WHERE ${obj.field2} = ${value2}`

    db.run(query, (err) => {
      cb(err)
    })
  }

  static delete(table, field, value, cb) {
    let val;
    if(isNaN(value)) {
      val = `"${value}"`
    } else {
      val = value
    }

    let query = `DELETE FROM ${table} WHERE ${field} = ${value}`
    db.run(query, (err) => {
      cb(err)
    })
  }

}
module.exports = Model