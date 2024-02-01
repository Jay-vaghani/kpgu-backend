const express = require("express");
const app = express();
const studentRoutes = require("./routes/student.js");

app.use(express.json());


app.get("/", (req, res) => {
  res.send("<h1>Server Is running</h1>");
});

app.use("/student", studentRoutes);

module.exports = app;
