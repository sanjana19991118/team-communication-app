import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
  .withUrl("http://localhost:5000/chatHub", {
    accessTokenFactory: () => localStorage.getItem("jwt")
  })
  .withAutomaticReconnect()
  .build();

export async function startConnection() {
  try {
    await connection.start();
    console.log("Connected to SignalR");
  } catch (err) {
    console.error("SignalR Connection Error:", err);
  }
}

export function onMessageReceived(callback) {
  connection.on("ReceiveMessage", callback);
}

export function sendMessage(channelId, user, message) {
  connection.invoke("SendMessage", channelId, user, message);
}
