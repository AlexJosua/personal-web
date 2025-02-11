class Phone {
  battery = 0;
  screen = 0;
  signal = 0;

  constructor(name = "") {
    this.name = name;
  }

  connectWifi() {
    console.log("this Phone has signal :", this.signal);
    console.log("this Phone has Battery :", this.battery);
    if (this.signal > 50 && this.battery > 20) {
      this.succesConnect();
    } else {
      this.failedConnect();
    }
  }

  succesConnect() {
    console.log("Succes connect");
  }

  failedConnect() {
    console.log("Failed To Connect");
  }
}

const iphone = new Phone("Iphone 15");
iphone.signal = 60;
iphone.battery = 80;

iphone.connectWifi();
