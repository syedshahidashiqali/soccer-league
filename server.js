require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const logger = require("morgan");
const connectDB = require("./config/db");

const app = express();
app.use(express.json({ limit: "50mb" }));

app.use(helmet());
app.use(logger("dev"));
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

connectDB();
app.listen(process.env.PORT, () => {
  console.log(
    "\u001b[" +
      34 +
      "m" +
      `Server started on port: ${process.env.PORT}` +
      "\u001b[0m"
  );
});
