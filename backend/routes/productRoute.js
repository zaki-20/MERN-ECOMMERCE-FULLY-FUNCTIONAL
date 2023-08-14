const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controller/productController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();


//get all products
router.route("/products").get(getAllProducts);

//create new product
router.route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

//update and delete product
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)

//get single product details
router.route("/product/:id").get(getProductDetails);

module.exports = router;
