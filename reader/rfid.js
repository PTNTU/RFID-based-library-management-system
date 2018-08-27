
/*
# Read RFID
# Components
    * RFID-RC522
# Connections
    - (1)SDA: (Pin 24)GPIO8 (CE0)
    - (2)SCK: (Pin 23)GPIO11 (SCLK)
    - (3)MOSI: (Pin 19)GPIO10 (MOSI)
    - (4)MISO: (Pin 21)GPIO9 (MISO)
    - (5)IRQ: (Not Connected)
    - (6)GND: Ground
    - (7)RST: (Pin 22)GPIO25
    - (8)3.3V: 3.3V
# needed: BCM 2835 library
# needed: sudo
*/
var rc522 = require("rc522");

function Rfid(callback){
    // console.log(rc522);
    rc522(function(rfidSerialNumber){
        // console.log(rfidSerialNumber);
        callback('RFID', 0, rfidSerialNumber);
    });
}

module.exports = Rfid;
