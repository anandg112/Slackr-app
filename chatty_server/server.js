const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });


//broadcast message to each client
wss.broadcast = function(message) {
	wss.clients.forEach((client) => client.send(message));
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
	updateUserCount();

	ws.on('message', (msg) => {
		let message = JSON.parse(msg);

		switch(message.type) {

			case 'postMessage':
				wss.broadcast(JSON.stringify({
					type: 'incomingMessage',
					id: uuid.v1(),
					user: {
						username: message.username,
					},
					  content: message.content
				}));
				break;

			case 'postNotification':
				console.log(message.content);
				wss.broadcast(JSON.stringify({
					type: 'incomingNotification',
					id: uuid.v1(),
					content: message.content
				}));
				break;

			default:
		}
	});

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
		console.log('Client disconnected');
		updateUserCount();
	});
});

function updateUserCount() {
	console.log(`${wss.clients.size} client(s) connected`);
	wss.broadcast(JSON.stringify({
		type: 'updateUserCount',
		userCount: wss.clients.size
	}));
}
