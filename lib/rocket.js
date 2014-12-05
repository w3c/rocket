'use strict';

var argv = require('yargs').argv;
var socket = require('socket.io-client');
var fs = require('fs');
var clients = [];

var Client = function(url, profile) {
	this.id = profile.id;
	this.profile = profile;
	this.stack = [];
	this.instance = socket.connect(url, {
		'force new connection': true
	});
};

Client.prototype.init = function() {
	var self = this;
	this.profile.checkpoints.forEach(function(checkpoint) {
		self.instance.on(checkpoint, function(data) {
			var time = Date.now();
			if(timer(time, self.stack[0].time) > 10000) {
				console.log('contenu qui bloque : ' +data);
			}
			self.stack.push({
				'event': checkpoint,
				'type': 'checkpoint',
				'time': time,
				'timer': timer(time, self.stack[0].time),
				'data': data
			});
			displayInfo('checkpoint', {
				'id': self.id,
				'checkpoint': lastElement(self.stack).event,
				'timer': lastElement(self.stack).timer
			});
		});
	});
	this.instance.on(this.profile.stop, function(data) {
		var time = Date.now();
		self.stack.push({
			'event': self.profile.stop,
			'type': 'stop',
			'time': time,
			'timer': timer(time, self.stack[0].time),
			'data': data
		});
		displayInfo('stop', {
			'id': self.id,
			'timer': lastElement(self.stack).timer
		});
		self.stop();
	});
};

Client.prototype.start = function() {
	this.instance.emit(this.profile.start.event, this.profile.start.data);
	displayInfo('start', {
		'id': this.id
	});
	this.stack.push({
		'event': this.profile.start.event,
		'type': 'start',
		'time': Date.now(),
		'data': this.profile.start.data
	});
};

Client.prototype.stop = function() {
	delete this.instance;
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

/* 
 * Toolbox functions
 */

function timer(time1, time2) {
	return Math.abs(time1 - time2);
}

function lastElement(element) {
	return element[element.length - 1];
}

function displayInfo(key, data) {
	switch (key) {
		case 'start':
			console.info('client %d started', data.id);
			break;
		case 'checkpoint':
			console.info('client %d reach %s checkpoint after %d ms', data.id, data.checkpoint, data.timer);
			break;
		case 'stop':
			console.info('client %d stop after %d ms', data.id, data.timer);
			break;
		default:
			console.error('unmanaged key in displayInfo function!');
			break;
	}
}


if (argv.f) {
	var conf = JSON.parse(getConfigurationFile('lib/conf.json', 'utf8'));
	var id = 0;
	conf.profiles.forEach(function(profile) {
		for (var i = 0; i < profile.counter; i++) {
			id++;
			profile.id = id;
			clients.push(new Client(conf.target, profile));
		}
	});
	clients.forEach(function(client) {
		client.init();
	});
	clients.forEach(function(client) {
		client.start();
	});
}