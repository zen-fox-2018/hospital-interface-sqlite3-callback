class View {
  static display (msg , data) {
    if(data) {
      console.log(`Success: `, msg, data)
    } else {
      console.log(`Success : `, msg)
    }
  }

  static error(msg, err) {
    if(err) {
      console.log(`Error : ${msg}` , err)
    } else {
      console.log(`Error : ${msg}`)
    }
  }


  static help() {
    console.log(`
    ================= AVAILABLE COMMAND ===============
    node main.js register <username> <password> <position>
    node main.js login <username> <password>
    node main.js addPatient <patient_name> <diagnosis>
    node main.js logout <username>
    node main.js delete <patientid>
    ===================================================
    `)
  }
  
}

module.exports = View