// const express = require('express');
// const app = express();
// const http = require('http');
// const server = http.createServer(app);

// // app.get('/', (req, res) => {
// //   res.send('<h1>Hello world</h1>');
// // });

// server.listen(19006, () => {
//   console.log('listening on *:19006');
// });

// import { WebSocketServer } from "ws";

// const server = new WebSocketServer({ port: 3000 });

// server.on("connection", (socket) => {
//   // envoi d'un message au client
//   socket.send(JSON.stringify({
//     type: "bonjour du serveur",
//     content: [ 1, "2" ]
//   }));

//   // réception d'un message envoyé par le client
//   socket.on("message", (data) => {
//     const packet = JSON.parse(data);

//     switch (packet.type) {
//       case "bonjour du client":
//         // ...
//         break;
//     }
//   });
// });

import { Server } from "socket.io";

const io = new Server(3000);

io.on("connection", (socket) => {
  // envoi d'un message au client
  socket.emit("bonjour du serveur", 1, "2", { 3: Buffer.from([4]) });

  // réception d'un message envoyé par le client
  socket.on("bonjour du client", (...args) => {
    // ...
  });
});