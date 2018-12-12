class View {

    static showData(data) {
        console.log(data)
    }

    static showDataErr(err) {
        console.log(err)
    }

    static showRegDone(username, password, role, data) {
        console.log(`save data succes {"username":"${username}","password":"${password}","role":"${role}"}. Total employee : ${data.length} `)
    }

    static showRegErr(err) {
        console.log(err)
    }

    static cantLogin(data){
        console.log(`tidak bisa login, ${data} masih login`)
    }

    static noData(data){
        console.log(`${data} tidak terdaftar`)
    }

    static canLogin(data) {
        // user budi logged in successfully
        console.log(`user ${data} logged in successfully`)
    }

    static canLogout(data) {
        console.log(`user ${data} logged out successfully`)
    }

    static wrongPassword() {
        console.log('username / password wrong')
    }
}


module.exports = View