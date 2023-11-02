const express = require("express");
const _ = express.Router();
const {
  becomeMerchant,
  merchantStatusController,
  getAllStore,
} = require("../../controllers/merchantController");

_.post("/becomemerchant", becomeMerchant);
_.post("/merchantstatus", merchantStatusController);
_.get("/getallstore", getAllStore);

module.exports = _;
