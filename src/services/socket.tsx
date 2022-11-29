import io from "socket.io-client";
import { SOCKET_URL } from "../constants";

export const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  reconnectionDelayMax: 10000,
  auth: {
    token: localStorage.getItem("accessToken"),
  },
});

socket.on("connect", () => {
  console.log("server connected", socket.id);
});

socket.on("disconnect", () => console.log("server disconnected"));

export default class Socket {
  // constructor() {
  // console.log("constructor>>>>>>>");
  // }

  static sendMessage(data: any) {
    socket.emit("message", data);
  }

  static subscribeChannel(data: any) {
    console.log("subscribe_channel>>>>>>>");
    socket.emit("subscribe_channel", data);
  }
}
