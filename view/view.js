class View {

    static showData(data){
        console.log(data)
    }

    static showDataErr(err){
        console.log(err)
    }

    static showRegDone(username, password, role,data){
        console.log(`save data succes {"username":"${username}","password":"${password}","role":"${role}"}. Total employee : ${data.length} `)
    }

    static showRegErr(err){
        console.log(err)
    }
}


module.exports = View