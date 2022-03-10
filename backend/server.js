const express = require("express");
const http = require("http");
const cors = require("cors");

require("dotenv").config()

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);

const WebSocket = require("ws").Server;
const ws = new WebSocket({ port: 2500 })

const db = require("./app/models");

db.mongoose
  .connect(`mongodb+srv://lucas:${process.env.DB_PASSWORD}@cluster0.9ekgs.mongodb.net/Forex?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connected to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

ws.on('connection', async(socket) => {
  socket.isAlive = true;
  socket.on('pong', () => {
    socket.isAlive = true;
  })
  
  socket.on('message', async(message) => {
    console.log("I'm a websocket, and I just shake hands")
  })
  
  socket.on('close', () => {
    console.log("I lost a client");
  })
  console.log("One more client connected")
})

setInterval(() => {
  ws.clients.forEach((ws) => {
    if (!ws.isAlive) return ws.terminate();
    ws.isAlive = false;
    ws.ping();
  });
}, 10000);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my forex backend application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
