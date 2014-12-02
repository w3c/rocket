'use strict';

var argv = require('yargs').argv;
var socket = require('socket.io-client');
var fs = require('fs');
var clientsTab = new Array();

function Client(url, events, data) {
	this.events = events;
	this.data = data;
	this.instance = socket.connect(url, {
		'force new connection': true
	});
};

function getConfigurationFile(filePath, encoding) {
	try {
		return fs.readFileSync(filePath, {
			'encoding': encoding
		});
	} catch (e) {
		console.error(e);
	}
}

function createClient(url, args) {
	return new Client(url, args.events, args.data);
}

function emitStartClientEvent(client) {
	client.instance.emit(client.event, client.data);
}

function receiveEndServerEvent(client) {
	client.instance.on(client.events.stop, function(){
		console.log("client end");
	});
}

if (argv.f) {
	var conf = JSON.parse(getConfigurationFile('lib/conf.json', 'utf8'));
	conf.profiles.forEach(function(profile) {
		for (var i = 0; i < profile.num; i++) {
			clientsTab.push(new Client(conf.url, profile.events, profile.data));
		}
	});
	clientsTab.forEach(function(client) {
		emitStartClientEvent(client);
	});
	clientsTab.forEach(function(client) {
		receiveEndServerEvent(client);
	});
} else {
	for (var i = 0; i < argv.n; i++)
		clientsTab.push(new Client(argv.u, argv.e, profile.d));
	clientsTab.forEach(function(client) {
		client.instance.emit(client.events.start, client.data);
	});
}