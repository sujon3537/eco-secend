const express = require("express");
const _ = express.Router();
const multer = require("multer");
const {
  secureUpload,
  createProduct,
  createVariant,
  getAllProduct,
  deleteProduct,
  getAllVariant,
} = require("../../controllers/productController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        `.${file.originalname.split(".")[1]}`
    );
  },
});

const upload = multer({ storage: storage });

// _.post("/createproduct", secureUpload, createProduct);
_.post("/createproduct", createProduct);
_.post("/createvariant", upload.single("image"), createVariant);
_.get("/getallproduct", getAllProduct);
_.get("/getallvariant", getAllVariant);
_.post("/deleteproduct", deleteProduct);

module.exports = _;
