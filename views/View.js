
class View {
    static showErr(err) {
        console.log('Error ',err);
    }
    static showData(data) {
        console.log(data);
    }
    static showFailLogin() {
        console.log(`username / password wrong`);
    }
    static successLogin(name) {
        console.log(`user ${name} logged in successfully`);
        
    }
    static successLogout(name) {
        console.log(`user ${name} logged out successfully`);
        
    }
    static needLogin() {
        console.log(`User need to logged in `);
        
    }
    static alreadyLogin() {
        console.log(`User already logged in`);
        
    }
    static showNoAccess() {
        console.log(`tidak memiliki akses untuk add patient`);
        
    }
    static showSuccess( dataLength) {
        console.log(`User berhasil ditambahkan. Total Employee : ${dataLength}`);
    }

    static successAddPatient(dataLength) {
        console.log(`data pasien berhasil ditambahkan. Total data pasien : ${dataLength}`);
        
    }
}

module.exports = View