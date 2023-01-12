const mongoDB = "mongodb://127.0.0.1/postsDatabase";
const postsRouter = require("./postsRouter");
const { MongoClient } = require("mongodb");

const bodyParser = require("body-parser");

const express = require("express");

require("dotenv").config();

const mongoose = require("mongoose");

// Set up default mongoose connection
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/json" }));

app.use("/posts/", postsRouter);

app.listen(8000, () => {
  console.log(`app listening on port 8000`);
});
