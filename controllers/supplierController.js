const Supplier = require("../models/supplier");
const asyncHandler = require("express-async-handler");

// Display list of all Suppliers.
exports.supplier_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Supplier list");
});

// Display detail page for a specific Supplier.
exports.supplier_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Supplier detail: ${req.params.id}`);
});

// Display Author create form on GET.
exports.supplier_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Supplier create GET");
});

// Handle Author create on POST.
exports.supplier_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Supplier create POST");
});

// Display Author delete form on GET.
exports.supplier_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Supplier delete GET");
});

// Handle Author delete on POST.
exports.supplier_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Supplier delete POST");
});

// Display Author update form on GET.
exports.supplier_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Supplier update GET");
});

// Handle Author update on POST.
exports.supplier_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Supplier update POST");
});
