class View {

    static showError(err) {
        console.log('ERR :', err);
    }

    static viewData(data) {
        console.log(data);
    }

    static successReg(data) {
        console.log(`save data success ${JSON.stringify(data[data.length-1])}. Total employee : ${data.length}`);
    }

    static failedLogin() {
        console.log(`username / password salah!`);
    }

    static successLogin(username) {
        console.log(`user ${username} logged in successfully`)
    }

    static successAddPatient(dataPatient) {
        console.log(`data pasien berhasil ditambahkan. Total data pasien : ${dataPatient.length}`)
    }
}

module.exports = View;