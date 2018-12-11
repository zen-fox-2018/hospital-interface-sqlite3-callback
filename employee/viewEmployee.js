class ViewEmployee {
    static findError(err) {
        console.log(`ERROR!! ===== ${err}`)
    }

    static findSucceed(data) {
        console.log(`Here's all the data: `);
        console.log(data)
    }

    static registerError(err) {
        console.log(`REGISTER ERROR: ${err}`)
    }

    static registerSuccess(data) {
        console.log(`Save Data Success ${JSON.stringify(data[data.length - 1])} has been added. Total employee: ${data.length}`)//${data[data.length - 1]}
    }

    static loginError(err) {
        console.log(`ERROR! ==== ${err}`)
    }

    static usernameAndPasswordDontMatch() {
        console.log(`Username / Password Wrong.`)
    }

    static loginSuccessfull(username) {
        console.log(`Welcome! User ${username} logged in successfully.`)
    }

    static updateError(err) {
        console.log(`Update ERROR: ${err}`)
    }

    static someoneIsLoggedIn(msg) {
        // console.log(`Someone is login in the system.`)
        console.log(`ERROR: ${msg}`);
    }
}

module.exports = ViewEmployee
