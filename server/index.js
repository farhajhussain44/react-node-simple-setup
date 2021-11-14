import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';

import { createRequire } from 'module';
import {dbConnection} from "./config/mongo.js"
const require = createRequire(import.meta.url);
const socket = require('socket.io');
import { SocketConnection } from "./socket/index.js"

dotenv.config();


const environment = process.env.NODE_ENV || 'Local';
const Port = process.env.PORT || 8080


const app = express();
const server = http.createServer(app);
const io = socket(server);
dbConnection();
SocketConnection(io);

app.use(
    cors({
        origin: ['http://localhost:3000'],
        credentials: true,
    })
);


app.use(express.urlencoded({ extended: false }));
app.use(express.json());


server.listen(Port, () => {
    console.log(`server running in ${environment} mode & listening on port ${Port}`);
});