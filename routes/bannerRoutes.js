const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleWare");
const formidable = require("express-formidable");
const {
  bannerImageUploadController,
  getBannerImagesController,
  getBannerImage1Controller,
  getBannerImage2Controller,
  getBannerImage3Controller,
  getBannerImage4Controller,
  getBannerAlternateText,
  bannerImageUpdateController,
} = require("../controllers/bannerImageController");

const router = express.Router();

router.post(
  "/upload-banner-image",
  requireSignIn,
  isAdmin,
  formidable(),
  bannerImageUploadController
);

router.put(
  "/update-banner-image",
  requireSignIn,
  isAdmin,
  formidable(),
  bannerImageUpdateController
);

router.get("/get-banner-image1",getBannerImage1Controller)
router.get("/get-banner-image2",getBannerImage2Controller)
router.get("/get-banner-image3",getBannerImage3Controller)
router.get("/get-banner-image4",getBannerImage4Controller)

router.get("/get-alt-text",getBannerAlternateText)

module.exports = router;
