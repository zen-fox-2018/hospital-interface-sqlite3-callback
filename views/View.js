class View {
  static showError(msg) {
    console.log(msg)
  }

  static menuFail(msg) {
    console.log(msg)
  }

  static registSuccess(createdData, length) {
    let username = createdData.username
    let pass = createdData.password
    let role = createdData.role
    console.log(`Save data success username: ${username}, password: ${pass}, role: ${role}. Total employee : ${length}`)
  }

  static loginSuccess(username) {
    console.log(`Login Berhasil, Selamat Datang ${username}`)
  }

  static logoutSuccess(username) {
    console.log(`Logout Berhasil, Selamat Tinggal ${username}`)
  }

  static addSuccess(length) {
    console.log(`data pasien berhasil ditambahkan. Total data pasien : ${length}`)
  }
}

module.exports = View