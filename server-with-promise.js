const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const { promises } = require("fs");
var app = express();
//create http server from express
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static(__dirname));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
mongoose.Promise = Promise;
const dbcon = "mongodb+srv://aliali:1234567890@cluster0-6rstc.mongodb.net/test";
//Create mongodb module
const dbMessage = mongoose.model("message", {
  name: String,
  message: String,
});
app.get("/messages", (req, res) => {
  dbMessage.find({}, (err, messages) => {
    res.send(messages);
  });
});
app.post("/messages", (req, res) => {
  console.log(req.body);
  // Save to DB
  const m = new dbMessage(req.body);
  m.save()
    .then(() => {
      console.log("Message savec");
      const newLocal = "badword";
      return dbMessage.findOne({ message: newLocal });
    })
    .then(censord => {
      if (censord) {
        console.log("removed censord word",censord);
        return dbMessage.deleteOne({ _id: censord._id });
      }
      io.emit("message", req.body);
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(500);
      return console.error(err);
    });
});
// check socket is connected
io.on("connection", (socket) => {
  console.log("a user connected");
});
// check mongoedb is connected
mongoose.connect(
  dbcon,
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err) => {
    console.log("Database connected to mongodb", err);
  }
);
var server = http.listen(3000, () => {
  console.log("Server running on port", server.address().port);
});
