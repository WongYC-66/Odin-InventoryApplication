const Item = require("../models/item");
const Category = require("../models/category");
const Supplier = require("../models/supplier");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  // Get details of items, suppliers, and category counts (in parallel)
  const [
    numItems,
    numCategory,
    numSuppliers,
  ] = await Promise.all([
    Item.countDocuments({}).exec(),
    Category.countDocuments({}).exec(),
    Supplier.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Catalogue Home",
    item_count: numItems,
    category_count: numCategory,
    supplier_count: numSuppliers,
  });
});

// Display list of all items.
exports.item_list = asyncHandler(async (req, res, next) => {
  const allItems = await Item.find({}, "name quantity category")
    .sort({ name: 1 })
    .populate("category")
    .exec();

  res.render("item_list", { title: "Item List", item_list: allItems });
});

// Display detail page for a specific item.
exports.item_detail = asyncHandler(async (req, res, next) => {
  // Get details of items
  const item = await Item.findById(req.params.id)
    .populate("supplier")
    .populate("category")
    .exec();

  if (item === null) {
    // No results.
    const err = new Error("Book not found");
    err.status = 404;
    return next(err);
  }

  res.render("item_detail", {
    item: item,
  });
});

// Display item create form on GET.
exports.item_create_get = asyncHandler(async (req, res, next) => {
  // Get all suppliers and categories, which we can use for adding to our item.
  const [allSuppliers, allCategories] = await Promise.all([
    Supplier.find().sort({ name: 1 }).exec(),
    Category.find().sort({ name: 1 }).exec(),
  ]);

  res.render("item_form", {
    title: "Create Item",
    suppliers: allSuppliers,
    categories: allCategories,
  });
});

// Handle item create on POST.
exports.item_create_post = [
  // Validate and sanitize fields.
  body("name", "Name must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("supplier", "Supplier must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("quantity")
    .trim()
    .isLength({ min: 1 })
    .withMessage("quantity must not be empty")
    .isNumeric()
    .withMessage("quantity number has non-numeric characters.")
    .escape(),
  body("price")
    .trim()
    .isLength({ min: 1 })
    .withMessage("price must not be empty")
    .isNumeric()
    .withMessage("price has non-numeric characters.")
    .escape(),
  body("category", "category must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  // Process request after validation and sanitization.

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Book object with escaped and trimmed data.
    const item = new Item({
      name: req.body.name,
      supplier: req.body.supplier,
      quantity: req.body.quantity,
      price: req.body.price,
      category: req.body.category,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      // Get all authors and categories for form.
      const [allSuppliers, allCategories] = await Promise.all([
        Supplier.find().sort({ name: 1 }).exec(),
        Category.find().sort({ name: 1 }).exec(),
      ]);

      res.render("item_form", {
        title: "Create Item",
        suppliers: allSuppliers,
        categories: allCategories,
        item: item,
        errors: errors.array(),
      });
    } else {
      // Data from form is valid. Save Item.
      await item.save();
      res.redirect(item.url);
    }
  }),
];

// Display item delete form on GET.
exports.item_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item delete GET");
});

// Handle item delete on POST.
exports.item_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item delete POST");
});

// Display item update form on GET.
exports.item_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item update GET");
});

// Handle item update on POST.
exports.item_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item update POST");
});
