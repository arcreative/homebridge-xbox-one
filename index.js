var dgram = require('dgram');

const PORT = 5050
const PING_PAYLOAD = "dd00000a000000000000000400000002"
const POWER_PAYLOAD = "dd02001300000010"

var Service, Characteristic;

module.exports = function(homebridge){
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory("homebridge-xbox-one", "Xbox", XboxAccessory);
}

function XboxAccessory(log, config) {
  this.log = log;
  this.name = config["name"] || 'Xbox';
  this.ipAddress   = config["ipAddress"];
  this.liveId  = config["liveId"];
}

XboxAccessory.prototype = {

  send: function(data, callback) {
    var socket = dgram.createSocket('udp4');
    socket.send(data, 0, data.length, PORT, this.ipAddress, function(err, bytes) {
      if (err) throw err;
      socket.close();
      callback();
    });
  },

  setPowerState: function(powerOn, callback) {
    var cmd;

    this.log("Sending on command to '" + this.name + "'...");

    var message = Buffer.concat([new Buffer(POWER_PAYLOAD, 'hex'), new Buffer(this.liveId), new Buffer(1).fill(0)]);
    this.send(message, callback);
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
