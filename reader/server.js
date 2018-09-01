var Rfid = require('./rfid');
var io = require('socket.io-client');
var config = require('../config');

var serverUrl = 'http://' + config.server.ip + ':' + config.server.port;
var socket = io(serverUrl);

var rfid = new Rfid(readRfid);

function readRfid(type, index, value) {
   // send to socket
   console.log(type, index, value);
   socket.emit('control',value);
}
