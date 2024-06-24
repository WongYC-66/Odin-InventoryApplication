const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SupplierSchema = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 50 },
  address: { type: String, required: true, minLength: 1, maxLength: 100 },
  contact_number: { type: String },
  registration_number: { type: Number },
});

// Export model
module.exports = mongoose.model("Supplier", SupplierSchema);