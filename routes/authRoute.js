const express = require("express");
const {
  registerController,
  loginController,
  forgotPasswordController,
  tokenVerification,
  resetPassword,
} = require("../controllers/authController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleWare");
const router = express.Router();

//Register route
router.post("/register", registerController);

//Login route
router.post("/login", loginController);

//user email and phone verification

//forgot-password
router.post("/forgot-password", forgotPasswordController);

//reset-password-token-verification
router.post("/reset-password-token-verification", tokenVerification);

//reset-password
router.post("/reset-password", resetPassword);

//protected user route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ success: true });
});
//protected admin route
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ success: true });
});

module.exports = router;
