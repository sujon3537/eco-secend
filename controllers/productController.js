const User = require("../models/userModel.js");
const Product = require("../models/productModel.js");
const Variant = require("../models/variantModel.js");

async function secureUpload(req, res, next) {
  let userId = req.headers.authorization.split("@")[1];
  let password = req.headers.authorization.split("@")[2];

  if (!req.headers.authorization) {
    return res.send({ error: "Unauthorized" });
  }

  let user = await User.find({ _id: userId });

  if (user.length > 0) {
    if (password == process.env.MERCHANT_SECRET_KEY) {
      if (user[0].role == "merchant") {
        next();
      } else {
        return res.send({ error: "You are not able to upload product" });
      }
    } else {
      return res.send({ error: "You are not able to upload product" });
    }
  } else {
    return res.send({ error: "You are not able to upload product" });
  }
}

function createProduct(req, res) {
  const { name, description, image, store } = req.body;

  let product = new Product({
    name,
    description,
    image,
    store,
  });

  product.save();

  res.send({ success: "Product created successfully" });
}

async function createVariant(req, res) {
  const { color, image, size, storage, ram, product } = req.body;

  let variant = new Variant({
    color,
    image: `${process.env.IMAGE_PATH}/uploads/${req.file.filename}`,
    size,
    storage,
    ram,
    product,
  });

  variant.save();

  await Product.findOneAndUpdate(
    { _id: variant.product },
    { $push: { variants: variant._id } },
    { new: true }
  );

  res.send({ success: "Varinat created successfully" });
}

async function getAllVariant(req, res) {
  const allVariant = await Variant.find({}).populate("product");
  res.send(allVariant);
}

async function getAllProduct(req, res) {
  const allProduct = await Product.find({}).populate("store");
  res.send(allProduct);
}
async function deleteProduct(req, res) {
  const data = await Product.findByIdAndDelete(req.body.id);
  res.send("Product has been deteled successfully!");
}

module.exports = {
  secureUpload,
  createProduct,
  createVariant,
  getAllVariant,
  getAllProduct,
  deleteProduct,
};
