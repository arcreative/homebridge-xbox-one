var Xbox = require('xbox-on');

var Service, Characteristic;

module.exports = function(homebridge){
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory("homebridge-xbox-one", "Xbox", XboxAccessory);
}

function XboxAccessory(log, config) {
  this.log = log;
  this.name = config['name'] || 'Xbox';
  this.xbox = new Xbox(config['ipAddress'], config['liveId']);
  this.tries = config['tries'] || 5;
  this.tryInterval = config['tryInterval'] || 1000;
}

XboxAccessory.prototype = {

  setPowerState: function(powerOn, callback) {
    this.log("Sending on command to '" + this.name + "'...");

    // Queue tries times at tryInterval
    for (var i = 0; i < this.tries; i++) {
      setTimeout(function() {
        console.log('trying...');
        this.xbox.powerOn();
      }, i * this.tryInterval);
    }

    // Don't really care about powerOn errors, and don't want more than one callback
    callback();
  },

  identify: function(callback) {
    this.log("Identify...");
    callback();
  },

  getServices: function() {
    var switchService = new Service.Switch(this.name);

    switchService
      .getCharacteristic(Characteristic.On)
      .on('set', this.setPowerState.bind(this));

    return [switchService];
  }
};
