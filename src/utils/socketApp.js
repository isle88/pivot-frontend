const express = require("express");
const app = express();
const io = require("socket.io")(3001);

var path = require("path");
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {

  socket.on('student_answer', (data) => {
    console.log(data , '<<<<<')
  } )

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

