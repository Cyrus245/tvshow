const express = require("express");
const bodyparser = require("body-parser");
const { reset } = require("nodemon");
const { promiseImpl } = require("ejs");
const router = require("./routes/router");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(router);
app.listen(process.env.PORT || 3000, () => {
  console.log("server started on port 3000");
});
