const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./routes/router");

const mongoose = require("mongoose");
require("dotenv/config");

const app = express();

app.use(bodyParser.json({ limit: "40mb" }));
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use("/", router);

const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose
  .connect(process.env.DB_URI, dbOptions)
  .then(() => console.log("Connected to Database succesfully"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
