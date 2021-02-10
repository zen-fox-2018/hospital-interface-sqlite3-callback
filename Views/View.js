class View {
    static displayErr(err) {
        console.log(err)
    }

    static displaySucessregister(data) {
        console.log(data)
    }

    static displaysuccesslogin(data) {
        console.log(`user ${data} logged in successfully`)
    }
    static displaysuccesslogout(data) {
        console.log(`logout berhasi`)
    }
}

module.exports = View