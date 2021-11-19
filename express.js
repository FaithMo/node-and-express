const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { pool } = require("./src/pool");
const {
  createTable,
  addNewVisitors,
} = require("./src/source");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
pool.on("error", (err) => {
  console.error("An idle client has experienced an error", err.stack);
});
pool.connect((error) => {
  if (error) {
    throw error;
  } else {
    console.log("Connected!");
  }
});

app.listen(2001, () => console.log(`http://localhost:${2001}/new_visit`));

createTable();

app.get("/new_visit", (req, res) => {
  res.sendFile(path.join(__dirname + "/new_visit.html")), (error) => {
    if (error) {
      throw error
    } else {
      console.log(req.body)
    }
  }
});

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "pug");

app.post("/", async (req, res) => {
  let userInfo = req.body;
  let vis = await addNewVisitors(
    userInfo.name,
    userInfo.age,
    userInfo.date,
    userInfo.time,
    userInfo.assistor,
    userInfo.comments
  );
  res.render("views", {
    message: "Thank you for the info!",
    id: vis.id,
    name: userInfo.name,
    age: userInfo.age,
    date: userInfo.date,
    time: userInfo.time,
    assistant: userInfo.assistor,
    comments: userInfo.comments,
  }), (error, data) => {
    if (error) {
      throw error
    } else {
      console.log(data)
    }
  }
});
