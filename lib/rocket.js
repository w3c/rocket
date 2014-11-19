
'use strict';

var argv = require('yargs').argv
,   client = require('socket.io-client')
,   server = argv.u || 'http://localhost:3000'
,   clients = argv.c || 10
,   instance
,   errors = 0
;

for (var i = 0; i < clients; i++) {
    instance = client.connect(server, {'force new connection': true});
    instance.on('error', function(data) {
        console.log('Error #' + (++errors) + ':');
        console.dir(data);
    });
}

