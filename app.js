const express = require("express");
const app = express();
const cors = require("cors");
const studentRoutes = require("./routes/student.js");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Server Is running</h1>");
});

app.use("/student", studentRoutes);

module.exports = app;
