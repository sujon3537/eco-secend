const mongoose = require('mongoose');
const { Schema } = mongoose;

const storeSchema = new Schema({
    storeName: {
        type: String,
        required: true
    },
    officialEmail: {
        type: String,
        required: true,
    },
    officialPhone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    isActive: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: "waiting",
        enum: ["waiting", "approved", "rejected"]
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: "Product"
        }
    ]
})

module.exports = mongoose.model("Store", storeSchema);