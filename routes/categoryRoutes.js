const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleWare");
const formidable = require("express-formidable");
const {
  createCategoryController,
  updateCategoryController,
  getCategoryController,
  getSingleCategoryController,
  getSingleCategoryControllerById,
  deleteCategoryController,
  getCategoryImage,
} = require("../controllers/categoryController");

const router = express.Router();

//routes

//create-category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  formidable(),
  createCategoryController
);

//update-category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  formidable(),
  updateCategoryController
);

//get all category
router.get("/get-category", getCategoryController);

//get category image
router.get("/get-category-image/:id",getCategoryImage)

//get single category
router.get("/get-single-category/:slug", getSingleCategoryController);

//get single category by id
router.get("/get-single-category-by-id/:_id", requireSignIn,isAdmin,getSingleCategoryControllerById);

//delete category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

module.exports = router;
