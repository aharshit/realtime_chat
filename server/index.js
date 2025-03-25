const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const rooms = {}; 

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    const { room, username } = data;
    socket.join(room);
    socket.username = username;
    socket.room = room;

    if (!rooms[room]) {
      rooms[room] = [];
    }
    if (!rooms[room].includes(username)) {
      rooms[room].push(username);
    }

    console.log(`User ${username} joined room: ${room}`);

    
    io.to(room).emit("user_list", rooms[room]);
    socket.to(room).emit("user_joined", { username });
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    const { room, username } = socket;
    console.log(`User ${username} disconnected`);

    if (room && username) {
      rooms[room] = rooms[room].filter((user) => user !== username);
      io.to(room).emit("user_list", rooms[room]); 
      socket.to(room).emit("user_left", { username });
    }
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});
