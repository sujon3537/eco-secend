const express = require("express");
const _ = express.Router();
const {
  createDiscount,
  getAllDiscount,
} = require("../../controllers/discountController");

_.post("/creatediscount", createDiscount);
_.get("/getalldiscount", getAllDiscount);

module.exports = _;
