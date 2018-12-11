
class View {
    static viewSucced (input,data) {
        console.log(data)
        if(input){
            console.log(`save data sccess {"username :${input.username}}, { password: ${input.password} }, role: ${input.position} `)
            console.log(`total employee: ${data.length}`)
        }
    }
    static viewError (input) {
        if(input == error){
        }
        
    }
    static wrongPass() {
        console.log('password wrong')

    }static loginSucced(input) {
        console.log(`user ${input.name} logged succesfully`)
    }

    static succedAddPatient(input,data) {
        console.log(`data pasien, ${input.name} berhasil ditambahkan. total data  ${data.length}`)
    }

    static notDoctor () {
        console.log(`tidak memiliki akses untuk add patient`)
    }
}

module.exports = View