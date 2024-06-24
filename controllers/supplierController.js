const Supplier = require("../models/supplier");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");

// Display list of all Suppliers.
exports.supplier_list = asyncHandler(async (req, res, next) => {
  const allSuppliers = await Supplier.find({}, "name registration_number")
    .sort({ name: 1 })
    .exec();

  res.render("supplier_list", { title: "Supplier List", supplier_list: allSuppliers });
});

// Display detail page for a specific Supplier.
exports.supplier_detail = asyncHandler(async (req, res, next) => {
  // Get details of supplier and all their items (in parallel)
  const [supplier, allItemsBySupplier] = await Promise.all([
    Supplier.findById(req.params.id).exec(),
    Item.find({ supplier: req.params.id }, "name quantity category").exec(),
  ]);

  if (supplier === null) {
    // No results.
    const err = new Error("Author not found");
    err.status = 404;
    return next(err);
  }

  res.render("supplier_detail", {
    title: "Supplier Detail",
    supplier: supplier,
    supplier_items: allItemsBySupplier,
  });
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
