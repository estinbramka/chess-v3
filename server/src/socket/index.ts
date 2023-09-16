import type { Socket } from "socket.io";

import { io } from "../server.js";
import {
    chat,
    claimAbandoned,
    getLatestGame,
    joinAsPlayer,
    joinLobby,
    leaveLobby,
    sendMove
} from "./game.socket.js";

const socketConnect = (socket: Socket) => {
    socket.on("disconnect", leaveLobby);

    socket.on("joinLobby", joinLobby);
    socket.on("leaveLobby", leaveLobby);

    socket.on("getLatestGame", getLatestGame);
    socket.on("sendMove", sendMove);
    socket.on("joinAsPlayer", joinAsPlayer);
    socket.on("chat", chat);
    socket.on("claimAbandoned", claimAbandoned);
};

export const init = () => {
    io.on("connection", socketConnect);
};