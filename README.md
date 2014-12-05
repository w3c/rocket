
# rocket

*rocket* is a simple stress-testing API for [Node.js](http://nodejs.org/) applications, made with [socket.io](https://github.com/Automattic/socket.io).

# Installation

```bash
npm install -d
```

# Usage

```bash
nodejs lib/server.js &
nodejs lib/rocket.js --f
```

The client accept the following optional parameters:

* `-u` **URL of the server**
by default, `http://localhost:3000`
* `-c` **number of clients to launch**
by default, `10`

# Special thanks

I especially would like to thank [deniak](https://github.com/deniak) and [tripu](https://github.com/tripu) for helping me to find a wonderful name for a wonderful tool.

