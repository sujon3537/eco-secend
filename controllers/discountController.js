const Discount = require("../models/discountModel.js");

async function createDiscount(req, res) {
  const { parcent, cash, flat, category, subCategory, product } = req.body;

  const discount = new Discount({
    parcent,
    cash,
    flat,
    category,
    subCategory,
    product,
  });

  discount.save();
  res.send("Discount created sucessfully!");
}

async function getAllDiscount(req, res) {
  const allDiscount = await Discount.find({}).populate([
    "category",
    "subCategory",
    "product",
  ]);
  res.send(allDiscount);
}

module.exports = { createDiscount, getAllDiscount };
