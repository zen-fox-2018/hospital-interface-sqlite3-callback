
class View {

    static showSuccessPatientMessage(data){
        let totalData = data.length
        console.log(`data pasien berhasil ditambahkan.`)
        console.log(`total data pasien : ${totalData} `)
    }

    static showErrorMessage(msg){
        console.log(msg)
    }

    static showErrorPatientMessage(){
        console.log(`tidak memiliki akses untuk add patient`)
    }

    static showSuccessMessage(data){
        let indeks = data.length-1
        let totalData = data.length
        console.log(`save data success ${JSON.stringify(data[indeks])}.`)
        console.log(`Total employee : ${totalData}`)
    }

    static showAllMessage(data){
        console.log(data)
    }
}

module.exports = View