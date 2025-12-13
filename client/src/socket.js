import { io } from "socket.io-client";

const token = localStorage.getItem("token"); // saved after login
const socket = io("http://localhost:8000", {
  auth: { token }, // send token via Socket.IO handshake
  transports: ["polling", "websocket"], // fallback for dev

});

export default socket;
