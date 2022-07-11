import express from 'express'
import path from 'path'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app);
const io = new Server(server, {
  serveClient: false
});

const assetsRouter = require("./server/assets-router");
app.use("/src", assetsRouter);


io.on('connection', (socket) => {
  console.log('a user connected');
});



const PORT = 5000

app.use("/", express.static(path.join(__dirname, "public")));



app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, "public", "index.html"));
})

app.get('/api/hi', (req, res) => {
  res.json({ text: 'hello world' });
})

server.listen(PORT, () => {
  console.log('listening on *:3000');
});