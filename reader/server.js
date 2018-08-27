var Rfid = require('Rfid');

var rfid = new Rfid(readRfid);

function readRfid(type, index, value) {
   // send to socket
   console.log(type, index, value);
   // socket.emit('control', {
   //     type: type,
   //     no: index,
   //     falg: value
   // });
}
