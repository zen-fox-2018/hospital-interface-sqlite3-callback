
class View {
    static showRegistered(data) {
        console.log(`Save a data success! Total Employee: ${data}`)
    }

    static showDeleted(data) {
        console.log("You have successfully deleted this person!")
    }

    static showLogin(data) {
        console.log(data)
    }

    static showUpdated(data) {
        console.log("you have successfully updated this person!")
    }

    static showError(data) {
        console.log(data)
    }

    static showAddPtient(data) {
        console.log("You have successfully added this patient!")
    }
}

module.exports = View