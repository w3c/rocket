
'Use strict';

var express = require("express")
,   app = express()
,   http = require('http').Server(app)
,   io = require('socket.io')(http)
,   count = 0
,   port = process.env.PORT || 3000
;

io.on('connection', function(socket) {
    console.log(++count + " user connected");
});

http.listen(port, function() {
    console.log('listening on *:' + port);
});

