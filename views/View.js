class View {
    static displaySuccess(msg) {
        console.log(msg)
    }
    static displayError(msg, err) {
        console.log(msg, err)
    }
    static alert(msg) {
        console.log(msg)
    }
}

module.exports = View