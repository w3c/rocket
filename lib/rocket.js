
'use strict';

var argv = require('yargs').argv
,   client = require('socket.io-client')
,   server = argv.u || 'http://localhost:3000'
,   clients = argv.c || 10
,	message = argv.m || ''
,	data = argv.d || ''
,   instance
,   errors = 0
;

for (var i = 0; i < clients; i++) {
    instance = client.connect(server, {'force new connection': true});
    try {
    	console.log(JSON.parse(data) + 'sending...');
    	instance.emit(message, JSON.parse(data));
    } catch (e) {
    	console.error("parsing error: " + e);
    }
    //instance.emit(message, data.parse());
    instance.on('error', function(data) {
        console.log('Error #' + (++errors) + ':');
        console.dir(data);
    });
}

