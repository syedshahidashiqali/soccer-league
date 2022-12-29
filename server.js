require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const logger = require("morgan");

// ROUTES
const routes = require("./routes/index");

const connectDB = require("./config/db");

const PORT = process.env.PORT || 3000;
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

app.use(`/api/v1/`, routes);

connectDB();

app.listen(PORT, () => {
  console.log(
    "\u001b[" + 34 + "m" + `Server started on port: ${PORT}` + "\u001b[0m"
  );
});
