var argv = require('yargs').argv;
var client = require('socket.io-client');

var server
,	clients
,	timelapse;

if (argv.u)
	server = argv.u;
if (argv.c)
	clients = argv.c;

for (i = 0; i < clients; i++){
	client.connect(server, {'force new connection': true});
}




