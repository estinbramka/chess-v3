import express from "express";
import { createServer } from "http";
import cors from "cors";
import { Server } from "socket.io";

import { INIT_TABLES, db } from "./db/index.js";
import routes from "./routes/index.js";
import middleware from './middleware/index.js';
import admin from "./config/firebase-config.js";
import { init as initSocket } from "./socket/index.js";

const corsConfig = {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true
};

const app = express();
const server = createServer(app);

// database
await db.connect();
db.query(INIT_TABLES, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Tables initialized");
    }
});

// middleware
app.use(cors(corsConfig));
app.use(express.json());
app.use(middleware.decodeToken);
app.use("/v1", routes);

// socket.io
export const io = new Server(server, { cors: corsConfig, pingInterval: 30000, pingTimeout: 50000 });

io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;
    //console.log(token);
    if (token == null) return next(new Error("unauthorized"));
    try {
        const decodeValue = await admin.auth().verifyIdToken(token!);
        if (decodeValue) {
            //console.log(decodeValue);
            socket.data = decodeValue;
            return next();
        }
        return next(new Error("unauthorized"));
    } catch (e) {
        return next(new Error("Internal Error"));
    }
});
initSocket();

const port = process.env.PORT || 3001;
server.listen(port, () => {
    console.log(`chess-v3 api server listening on :${port}`);
});