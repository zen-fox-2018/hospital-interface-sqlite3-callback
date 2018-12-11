class userInterface {
    static registerSucceed(data) {
        let theData = JSON.stringify(data[data.length-1])
        console.log(`save data success ${theData}. Total employee :${data.length}`)
    } 
    static registerFailed(err) {
        console.log(err)
    }
    static loginSucceed(name) {
        console.log(`user ${name} logged in successfully`);
    }
    static loginFailed() {
        console.log('username / password wrong')
    }
    static cantlogin() {
        console.log('max login reached')
    }
    static findEmployeesFailed(err) {
        console.log(err)
    }
    static findEmployeesSucceed(data) {
        console.log(data)
    }
    static findByIdFailed(err) {
        console.log(err)
    }
    static findByIdSucceed(dataEmployee) {
        console.log(dataEmployee)
    }
    static addPatientFailed() {
        console.log("tidak memiliki akses untuk add patient")
    }
    static addPatientSucceed(data) {
        console.log(`data pasien berhasil ditambahkan. Total data pasien ${data.length}`)
    }
    static findPatientFailed(err) {
        console.log(err)
    }
    static findPatientSucceed(data) {
        console.log(data)
    }
}
module.exports = userInterface;
