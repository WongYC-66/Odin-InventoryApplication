const Supplier = require("../models/supplier");
const Item = require("../models/item");

const { body, validationResult } = require("express-validator");
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
  res.render("supplier_form", { title: "Create Supplier" });
});

// Handle Author create on POST.
exports.supplier_create_post = [
  // Validate and sanitize fields.
  body("name")
    .trim()
    .isLength({ min: 3, max: 50 })
    .escape()
    .withMessage("Supplier name must between 3 - 50 characters")
    .isAlphanumeric()
    .withMessage("Name has non-alphanumeric characters."),
  body("address")
    .trim()
    .isLength({ min: 1, max: 100 })
    .escape()
    .withMessage("Address must be between 1 - 100 characters"),
  body("contact_number")
    .trim()
    .escape()
    .optional({ values: "falsy" })
    .isAlphanumeric()
    .withMessage("contact number has non-alphanumeric characters."),
  body("registration_number")
    .trim()
    .escape()
    .optional({ values: "falsy" })
    .isNumeric()
    .withMessage("registration number has non-numeric characters."),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create Author object with escaped and trimmed data
    const supplier = new Supplier({
      name: req.body.name,
      address: req.body.address,
      contact_number: req.body.contact_number,
      registration_number: req.body.registration_number,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("supplier_form", {
        title: "Create Supplier",
        supplier: supplier,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.

      // Save supplier.
      await supplier.save();
      // Redirect to new supplier record.
      res.redirect(supplier.url);
    }
  }),
];

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
