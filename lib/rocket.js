'use strict';

var argv = require('yargs').argv;
var socket = require('socket.io-client');
var clients = new Array;
var numberOfClient = argv.c || 10;

function Client(url, event, data) {
	this.event = event;
	this.data = JSON.parse(data);
	this.instance = socket.connect(url, {'force new connection': true});
};

function checkArgv(args) {
	//todo
	//return true if ok
	// return false else
	return true;
};

if (argv.f) {
	//todo
	//readfile
	//heck args
	//put args
} else {
	//checkargs
	//put args
}

for (var i = 0; i < numberOfClient; i++) {
	clients[i] = new Client(argv.u, argv.e, argv.d);
	clients[i].instance.emit(clients[i].event, clients[i].data);
}



/*'use strict';

var argv = require('yargs').argv;
var numberOfClient = require('socket.io-client');
var server

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
    instance.on('error', function(data) {
        console.log('Error #' + (++errors) + ':');
        console.dir(data);
    });
}*/