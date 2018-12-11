
# rocket

*rocket* is a simple stress-testing API for [Node.js](http://nodejs.org/) applications, made with [socket.io](https://github.com/Automattic/socket.io).

:warning: This project is discontinued, and not being actively maintained.  

# Installation

```bash
npm install -d
```

# Usage

#### use the configuration file
To use rocket you have to configure the file named 'conf.json' in the lib repository like that:

1. create an empty json object.

	```javascript
	{}
	```

2. add your target. i.e the url of the application to test with rocket. It could be a local url.

	```javascript
	{
		"target": "http://example.com"
	}
	```

3. then, add client profiles tab.

	```javascript
	{
		"target": "http://example.com",
		"profiles": []
	}
	```

this profile tab contain all kind of clients you need to simulate.

4. create a client profile.

	```javascript
	{
		"start": {
			"event": "name_start_event", //name of the event which will start the application
			"data": {} //data to sent with start event
		},
		"checkpoints": ["name_checkpoint1", "name_checkpoint2", ...], //checkpoints event received by the server side
		"stop": "name_stop_event", //received event which will stop the client
		"counter": 10 //number of clients
	}
	```

5. example config file

	```javascript
	{
		"target": "http://example.com",
		"profiles": [
			//client profile
			{
			"start": {
				"event": "name_start_event", //name of the event which will start the application
				"data": {} //data to sent with start event
			},
			"checkpoints": ["name_checkpoint1", "name_checkpoint2", ...], //checkpoints event received by the server side
			"stop": "name_stop_event", //received event which will stop the client
			"counter": 10 //number of clients
			},
			//client profile
			{
			"start": {
				"event": "name_start_event", //name of the event which will start the application
				"data": {} //data to sent with start event
			},
			"checkpoints": ["name_checkpoint1", "name_checkpoint2", ...], //checkpoints event received by the server side
			"stop": "name_stop_event", //received event which will stop the client
			"counter": 5 //number of clients
			}
		]
	}
	```

6. run rocket

	```bash
	node lib/rocket.js -f
	```

#### use with commamd line arguments
not available yet.

# License

Copyright (c) 2014 [Guillaume Baudusseau](https://github.com/guibbs)
MIT

# Special thanks

I especially would like to thank [deniak](https://github.com/deniak) and [tripu](https://github.com/tripu) for helping me to find a wonderful name for a wonderful tool.

