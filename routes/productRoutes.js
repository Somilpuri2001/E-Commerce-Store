const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleWare");
const formidable = require("express-formidable");

const {
  createProductController,
  getProductController,
  getSingleProductController,
  getProductImageController,
  deleteProductController,
  updateProductController,
  getProductControllerByCategory,
  productFilterController,
  productPerPageController,
  getLatestProducts,
  getSimilarProductController,
} = require("../controllers/productController");

const {
  deleteCategoryController,
} = require("../controllers/categoryController");

const router = express.Router();

//routes
//create product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//get products
router.get("/get-products", getProductController);

//get products
router.get("/get-products-by-category/:category", getProductControllerByCategory);

//get single product
router.get("/get-product/:slug", getSingleProductController);

//get product image
router.get("/product-image/:pid", getProductImageController);

//delete product(s)
router.delete(
  "/delete-product/:id",
  requireSignIn,
  isAdmin,
  deleteProductController
);

//update product
router.put(
  "/update-product/:id",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//filter product
router.post('/product-filter',productFilterController)

//product per page
router.get('/product-list/:page',productPerPageController)  

router.get('/get-latest-products',getLatestProducts)

//get similar products

router.get('/similar-products/:pid/:cid',getSimilarProductController)

module.exports = router;
