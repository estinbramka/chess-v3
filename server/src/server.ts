import express from "express";
import { createServer } from "http";
import cors from "cors";

import { INIT_TABLES, db } from "./db/index.js";
import routes from "./routes/index.js";
import middleware from './middleware/index.js';

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

const port = process.env.PORT || 3001;
server.listen(port, () => {
    console.log(`chess-v3 api server listening on :${port}`);
});