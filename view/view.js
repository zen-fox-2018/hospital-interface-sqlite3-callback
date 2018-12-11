class View {

  static displayError(err) {
    console.log('ERR: ', err);
  }

  static displayData(data) {
    console.log('ALL DATA');
    console.log(data);
  }

  static regSucceed(data) {
    console.log('Save data success');
    console.log(`${JSON.stringify({username: data[data.length-1].username,
      password: data[data.length-1].password,
      position: data[data.length-1].position})}`);
    console.log('Total Employees: ' + data.length);
  }

  static displayLoginStatus(string) {
    console.log(string);
  }

  static displayAddPatientStatus(string) {
    console.log(string);
  }

}

module.exports = View;