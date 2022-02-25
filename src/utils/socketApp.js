const express = require("express");
const app = express();
const http = require("http");

const io = require("socket.io")(3001);

var path = require("path");
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {

  console.log(socket.id)

  socket.on('test', (data) => {
    console.log(data , '<<<<<')
  } )

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

