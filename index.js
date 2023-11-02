require("dotenv").config();
const express = require("express");
const dbConnection = require("./config/dbConnection.js");
const routes = require("./routes");
const cors = require("cors");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dbConnection();
app.use(routes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("Ecommerce Secend Backend on Render");
});

app.listen(8000, () => {
  console.log("port running on 8000");
});
