var express = require("express"),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

var count = 0;

io.on('connection', function(socket) {
	count++;
    console.log(count + " user connected");
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});