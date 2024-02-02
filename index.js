const app = require("./app");
const fs = require("fs");



app.listen(process.env.PORT, () => {
  console.log(`server running on ${process.env.PORT}`);
});
