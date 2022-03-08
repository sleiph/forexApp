import express from "express";
import * as http from 'http';
import * as WebSocket from 'ws';

import { connectToDatabase } from "./services/database.service";
import { usersRouter } from "./routes/users.router";

const app = express();

const port = 8080; // default port to listen

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });


wss.on('connection', (ws: WebSocket) => {

    console.log("connected")
    //connection is up, let's add a simple simple event
    ws.on('message', (message: string) => {

        //log the received message and send it back to the client
        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
    });

    //send immediatly a feedback to the incoming connection    
    ws.send('Hi there, I am a WebSocket server');
});

connectToDatabase()
    .then(() => {
        app.use("/users", usersRouter);

        // start the Express server
        app.listen(process.env.PORT || port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });
