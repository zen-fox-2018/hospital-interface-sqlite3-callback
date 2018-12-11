
class View {
  static errorCreateUser(err){
    console.log("Create user error!");
    console.log(err);
  }

  static errorFind(err){
    console.log("find data error!");
    console.log(err);
  }

  static succesCreateUser(newUser, datalength){
    console.log("save data success", newUser, 'Total employee :', datalength);
  }

  static successLogin(data){
    console.log(data);
  }

  static errorUpdate(err){
    console.log("Update data error!");
    console.log("err");
  }

  static somebodyIsLogin(user){
    console.log(`${user} is login!`);
  }

  static successLogin(user){
    console.log(`user ${user} logged in successfully`);
  }

  static failLogin(){
    console.log('username / password wrong');
  }

  static failAddPatient(err){
    console.log('add patient failed!');
    console.log(err);
  }

  static succesCreatePatient(datalength){
    console.log(`data pasien berhasil ditambahkan. Total data pasien : ${datalength}`);
  }

  static notDoctor(){
    console.log(`tidak memiliki akses untuk add patient`);
  }

  static successLogout(user){
    console.log(user,'berhasil logout!');
  }

  static nobodyLogin(){
    console.log('tidak ada yang login!');
  }
}

module.exports = View;
