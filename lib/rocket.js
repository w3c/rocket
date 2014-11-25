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