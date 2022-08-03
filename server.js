import express from 'express'
import path from 'path'
import http from 'http'
import { Server } from 'socket.io'

import api from './server/api'

const PORT = 5000

const app = express()
const server = http.createServer(app);
const io = new Server(server, {
  serveClient: false
});

io.on('connection', (socket) => {
  console.log('a user connected');
});


// Set up static assets
const assetsRouter = require("./server/assets-router");
app.use("/src", assetsRouter);
app.use("/", express.static(path.join(__dirname, "public")));

// Set up Client
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, "public", "index.html"));
})

// Set up API
app.use('/api', api)



server.listen(PORT, () => {
  console.log('listening on *:3000');
});