import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import http from 'http'
import { Server } from 'socket.io'

import api from './server/api'

// exemple : https://github.com/jamalsoueidan/booking-shopify-external-app/tree/c08d3c3933a97f9b9fd226e33603c362b3f27c39

const PORT = 5000
const isProd = process.env.NODE_ENV === "production"

const app = express()
const server = http.createServer(app);
const io = new Server(server, {
  serveClient: false
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

// Post data
app.use(bodyParser.json()) // for parsing application/json

// Set up static assets
const assetsRouter = require("./server/assets-router");
app.use("/src", assetsRouter);
app.use("/", express.static(path.join(__dirname, "public")));

// Set up Client
app.get('/', function(req, res){
  const htmlFile = path.join(__dirname, "public", isProd ? "index.html" : "dev.html");
  res.sendFile(htmlFile);
})

// Set up API
app.use('/api', api)



server.listen(PORT, () => {
  console.log('server listening on *:5000');
});