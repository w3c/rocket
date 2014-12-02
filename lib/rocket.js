'use strict';

var argv = require('yargs').argv;
var socket = require('socket.io-client');
var fs = require('fs');
var clientsTab = new Array();

function Client(url, events, data, id) {
	this.id = id;
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

function createClient(url, args, id) {
	return new Client(url, args.events, args.data, id);
}

function emitStartClientEvent(client) {
	console.log('emit client ' + client.id);
	client.instance.emit(client.events.start, client.data);
}

function receiveEndServerEvent(client) {
	client.instance.on(client.events.stop, function() {
		console.log("client " + client.id + " end");
	});
}

if (argv.f) {
	var conf = JSON.parse(getConfigurationFile('lib/conf.json', 'utf8'));
	var id = 0;
	conf.profiles.forEach(function(profile) {
		for (var i = 0; i < profile.num; i++) {
			id++;
			clientsTab.push(new Client(conf.url, profile.events, profile.data, id));
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