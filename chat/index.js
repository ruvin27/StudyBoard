const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
var users = [];

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
	},
});

io.on("connection", (socket) => {
	socket.on("user_connected", (userData) => {
		users[userData.email] = { socketId: socket.id, name: userData.name };
		console.log(users);
	});

	socket.on("user_disconnect", (userEmail) => {
		delete users[userEmail.email];
		console.log(users);
	});

	socket.on("send_message", function (data) {
		const receiver = users[data.receiver];

  if (receiver) {
    // User is online and in the list, send the message
    const receiverSocketId = receiver.socketId;
    io.to(receiverSocketId).emit("new_message", data);
  } else {
    // User is not online or not in the list, handle as needed
    console.log("Recipient is offline or not in the list");
    // You can optionally save the message to a database or handle it in some other way
  }
	});
});

server.listen(5000, () => {
	console.log("SERVER IS RUNNING");
});
