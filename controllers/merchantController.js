const Store = require("../models/merchantModel.js");
const User = require("../models/userModel.js");

async function becomeMerchant(req, res) {
  const { storeName, officialEmail, officialPhone, address, owner, products } =
    req.body;

  if (!storeName) {
    return res.send({ error: "Enter your store name" });
  } else if (!officialEmail) {
    return res.send({ error: "Enter your offcial email" });
  } else if (!officialPhone) {
    return res.send({ error: "Enter your official phone number" });
  } else if (!address) {
    return res.send({ error: "Enter your address" });
  } else if (!owner) {
    return res.send({ error: "Enter owner id" });
  } else {
    let duplicateEmail = await Store.find({ officialEmail: officialEmail });

    if (duplicateEmail.length > 0) {
      return res.send({
        error: "This email is already used! try with another",
      });
    }

    const store = new Store({
      storeName,
      officialEmail,
      officialPhone,
      address,
      owner,
      products,
    });

    store.save();

    await User.findOneAndUpdate(
      { _id: owner },
      { $set: { merchant: true, role: "merchant" } },
      { new: true }
    );

    res.send({ success: "You become merchant successfully" });
  }
}

async function merchantStatusController(req, res) {
  const { storeName, status } = req.body;

  if (status == "rejected" || status == "waiting") {
    let updateMerchant = await Store.findOneAndUpdate(
      { storeName: storeName },
      { $set: { isActive: false, status: status } },
      { new: true }
    );
    return res.send({ success: "Merchant status updated successfully" });
  } else if (status == "approved") {
    let updateMerchant = await Store.findOneAndUpdate(
      { storeName: storeName },
      { $set: { isActive: true, status: status } },
      { new: true }
    );
    return res.send({ success: "Merchant status updated successfully" });
  }
}
async function getAllStore(req, res) {
  const data = await Store.find({ owner: "646bae89c2aa9cb07bc4ec61" });
  res.send(data);
}

module.exports = { becomeMerchant, merchantStatusController, getAllStore };
