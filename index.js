const app = require("./app");
const fs = require("fs");
const dotenv = require("dotenv").config({ path: "./config/config.env" });



app.listen(process.env.PORT, () => {
  console.log(`server running on ${process.env.PORT}`);
});
