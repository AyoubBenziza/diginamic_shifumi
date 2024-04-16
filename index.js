const express = require("express");
const app = express();
require("dotenv").config();

const bodyParser = require("body-parser");
const gameRouter = require("./router/gameRouter");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use("/game", gameRouter);

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => res.redirect("/game"));

app.listen(process.env.PORT, () =>
  console.log(`Server Running on http://localhost:${process.env.PORT}`)
);
