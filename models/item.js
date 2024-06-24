const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true },
  supplier: { type: Schema.Types.ObjectId, ref: "Supplier", required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
});


// Export model
module.exports = mongoose.model("Item", ItemSchema);