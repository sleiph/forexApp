import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';

const mongoose = require('mongoose')
const cors = require('cors')
const { userController, preloadUsers } = require('../../controllers/user.controller')

require('dotenv').config()

const app = express()
app.use(cors())
const server = http.createServer(app)

const wss = new WebSocket.Server({ server });

mongoose.connect(`mongodb+srv://lucas:${process.env.MONGODB_KEY}@cluster0.9ekgs.mongodb.net/Forex?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('connected'))
.catch((err: Error) => console.error('not connected', err))

wss.on('connection', (socket: WebSocket) => {
  /*socket.isAlive = true
  socket.on('pong', () => {
    socket.isAlive = true
  })*/

  //connection is up, let's add a simple simple event
  socket.on('message', (message: string) => {
    //log the received message and send it back to the client
    userController(wss, socket, message)
    preloadUsers(socket)
  });

  preloadUsers(socket)

  //send immediatly a feedback to the incoming connection    
  socket.send('Hi, I am a WebSocket server');

  socket.on('close', () => {
    console.log('lost the client')
  })
  console.log('accquired client')
});

/*setInterval(() => {
  wss.clients.forEach((ws) => {
    if (!ws.isAlive)
      return ws.terminate()
    ws.isAlive = false
    ws.ping(null, false, true)
  })
}, 10000)*/

server.listen(process.env.PORT || 8999, () => {
  console.log(`server started on port: ${JSON.stringify({server})}`)
})
